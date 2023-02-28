import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import {
  IResponseItems,
} from '@/interfaces/response';
import IProfession from '@/interfaces/stores/course/profession';

export default defineStore('profession', {
  state: () => ({
    professions: null as IProfession[] | null,
  }),
  actions: {
    async readProfessions(
      baseUrl: string,
    ): Promise<IResponseItems<IProfession>> {
      try {
        const response = await axios.get<IResponseItems<IProfession>>('/api/private/site/course/professions', {
          baseURL: baseUrl,
        });

        this.professions = response.data.data;

        return response.data;
      } catch (error) {
        this.professions = null;

        throw error;
      }
    },
  },
});
