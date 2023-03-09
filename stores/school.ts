import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';
import TId from '@/types/id';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
    school: null as ISchool | null,
  }),
  actions: {
    async readSchools(baseUrl: string): Promise<IResponseItems<ISchool>> {
      try {
        const response = await axios.get<IResponseItems<ISchool>>('/api/private/site/school/read', {
          baseURL: baseUrl,
        });

        this.schools = response.data.data;

        return response.data;
      } catch (error) {
        this.schools = null;

        throw error;
      }
    },
    async getSchool(baseUrl: string, id: TId): Promise<IResponseItem<ISchool>> {
      try {
        const response = await axios.get<IResponseItem<ISchool>>(`/api/private/site/school/get/${id}`, {
          baseURL: baseUrl,
        });

        this.school = response.data.data;

        return response.data;
      } catch (error) {
        this.school = null;

        throw error;
      }
    },
  },
});
