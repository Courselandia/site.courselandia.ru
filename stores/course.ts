import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import ICourse from '@/interfaces/stores/course/course';
import IDirection from '@/interfaces/stores/course/direction';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    ratedCourses: null as ICourse[] | null,
  }),
  actions: {
    async readDirections(
      baseUrl: string,
    ): Promise<IResponseItems<IDirection>> {
      try {
        const response = await axios.get<IResponseItems<IDirection>>('/api/private/site/course/directions', {
          baseURL: baseUrl,
          params: {
            withCategories: 1,
            withCount: 1,
          },
        });

        this.directions = response.data.data;

        return response.data;
      } catch (error) {
        this.directions = null;

        throw error;
      }
    },
    async readRatedCourses(
      baseUrl: string,
      limit: number = 12,
    ): Promise<IResponseItems<ICourse>> {
      try {
        const response = await axios.get<IResponseItems<ICourse>>('/api/private/site/course/read', {
          baseURL: baseUrl,
          params: {
            limit,
          }
        });

        this.ratedCourses = response.data.data.courses;

        return response.data;
      } catch (error) {
        this.ratedCourses = null;

        throw error;
      }
    },
  },
});
