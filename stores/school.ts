import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
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
  },
});
