import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterTeacher from '@/interfaces/stores/course/filterTeacher';
import TId from '@/types/id';

export default defineStore('teacher', {
  state: () => ({
    teachers: null as IFilterTeacher[] | null,
    itemTeacher: null as IFilterTeacher | null,
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
    async getTeacher(baseUrl: string, id: TId): Promise<IResponseItem<IFilterTeacher>> {
      try {
        const response = await axios.get<IResponseItem<IFilterTeacher>>(`/api/private/site/teacher/get/${id}`, {
          baseURL: baseUrl,
        });

        this.itemTeacher = response.data.data;

        return response.data;
      } catch (error) {
        this.itemTeacher = null;

        throw error;
      }
    },
    async linkTeacher(baseUrl: string, link: string): Promise<IResponseItem<IFilterTeacher>> {
      try {
        const response = await axios.get<IResponseItem<IFilterTeacher>>(`/api/private/site/teacher/link/${link}`, {
          baseURL: baseUrl,
        });

        this.itemTeacher = response.data.data;

        return response.data;
      } catch (error) {
        this.itemTeacher = null;

        throw error;
      }
    },
  },
});
