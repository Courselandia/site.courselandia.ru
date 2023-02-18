import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
  }),
  actions: {
    async readDirections(
      baseUrl: string,
      withCategories: boolean | null = null,
      withCount: boolean | null = null,
    ): Promise<IResponseItems<IDirection>> {
      try {
        const response = await axios.get<IResponseItems<IDirection>>('/api/private/site/course/directions', {
          baseURL: baseUrl,
          params: {
            withCategories: withCategories ? 1 : 0,
            withCount: withCount ? 1 : 0,
          },
        });

        this.directions = response.data.data;

        return response.data;
      } catch (error) {
        this.directions = null;

        throw error;
      }
    },
  },
});
