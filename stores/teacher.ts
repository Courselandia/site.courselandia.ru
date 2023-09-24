import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItems,
} from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';

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
  },
});
