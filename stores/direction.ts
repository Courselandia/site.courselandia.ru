import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import TId from '@/types/id';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    itemDirection: null as IDirection | null,
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
    async getDirection(baseUrl: string, id: TId): Promise<IResponseItem<IDirection>> {
      try {
        const response = await axios.get<IResponseItem<IDirection>>(`/api/private/site/direction/get/${id}`, {
          baseURL: baseUrl,
        });

        this.itemDirection = response.data.data;

        return response.data;
      } catch (error) {
        this.itemDirection = null;

        throw error;
      }
    },
    async linkDirection(baseUrl: string, link: string): Promise<IResponseItem<IDirection>> {
      try {
        const response = await axios.get<IResponseItem<IDirection>>(`/api/private/site/direction/link/${link}`, {
          baseURL: baseUrl,
        });

        this.itemDirection = response.data.data;

        return response.data;
      } catch (error) {
        this.itemDirection = null;

        throw error;
      }
    },
  },
});
