import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseItems,
  IResponseItem,
} from '@/interfaces/response';
import type IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';

export default defineStore('teacher', {
  state: () => ({
    teachers: null as IFilterTeacher[] | null,
    itemLinkTeacher: null as ITeacherLink | null,
  }),
  actions: {
    async readTeachers(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterTeacher>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterTeacher>>(`/api/private/site/course/teachers?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.teachers = response.data.data;

        return response.data;
      } catch (error) {
        this.teachers = null;

        throw error;
      }
    },
    async linkTeacher(
      link: string,
    ): Promise<IResponseItem<ITeacherLink>> {
      const config = useRuntimeConfig();
      const path = config.public.development ? `/api/private/site/teacher/link/${link}` : `/storage/json/teachers/${link}.json`;
      const response = await axios.get<IResponseItem<ITeacherLink>>(path, {
        baseURL: config.public.apiUrl,
      });

      return response.data;
    },
  },
});
