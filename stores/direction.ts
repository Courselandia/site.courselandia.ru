import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IDirection from '@/interfaces/stores/course/direction';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    itemLinkDirection: null as IDirectionLink | null,
  }),
  actions: {
    async readDirections(
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<IDirection>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? '/api/private/site/course/directions'
          : `/storage/json/directions.json?cacheDate=${cacheDate}`;
        const response = await axios.get<IResponseItems<IDirection>>(path, {
          baseURL: config.public.apiUrl,
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
      link: string,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<IDirectionLink>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? `/api/private/site/direction/link/${link}`
          : `/storage/json/directions/${link}.json?cacheDate=${cacheDate}`;

        const response = await axios.get<IResponseItem<IDirectionLink>>(path, {
          baseURL: config.public.apiUrl,
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
