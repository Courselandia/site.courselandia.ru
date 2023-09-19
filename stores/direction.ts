import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    itemLinkDirection: null as IDirectionLink | null,
  }),
  actions: {
    async readDirections(
      baseUrl: string,
      development: boolean,
    ): Promise<IResponseItems<IDirection>> {
      try {
        const path = development ? '/api/private/site/course/directions' : '/storage/json/directions.json';

        const response = await axios.get<IResponseItems<IDirection>>(path, {
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
    async linkDirection(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<IDirectionLink>> {
      try {
        const path = development ? `/api/private/site/direction/link/${link}` : `/storage/json/directions/${link}.json`;

        const response = await axios.get<IResponseItem<IDirectionLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkDirection = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkDirection = null;

        throw error;
      }
    },
  },
});
