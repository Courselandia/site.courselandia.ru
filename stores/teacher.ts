import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import TId from '@/types/id';

export default defineStore('teacher', {
  state: () => ({
    teachers: null as IFilterTeacher[] | null,
    itemLinkTeacher: null as ITeacherLink | null,
  }),
  actions: {
    async readTeachers(
      baseUrl: string,
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterTeacher>> {
      try {
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterTeacher>>(`/api/private/site/course/teachers?${query}`, {
          baseURL: baseUrl,
        });

        this.teachers = response.data.data;

        return response.data;
      } catch (error) {
        this.teachers = null;

        throw error;
      }
    },
    async linkTeacher(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<ITeacherLink>> {
      try {
        const path = development ? `/api/private/site/teacher/link/${link}` : `/storage/json/teachers/${link}.json`;

        const response = await axios.get<IResponseItem<ITeacherLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkTeacher = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkTeacher = null;

        throw error;
      }
    },
  },
});
