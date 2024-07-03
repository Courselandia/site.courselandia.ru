import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import EDirection from '@/enums/direction';
import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ICollection from '@/interfaces/stores/collection/collection';

export default defineStore('collection', {
  state: () => ({
    list: null as Array<ICollection> | null,
    itemLinkCollection: null as ICollection | null,
  }),
  actions: {
    async readCollections(
      offset: number = 0,
      limit: number = 30,
      direction: EDirection | null = null,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<ICollection>> {
      try {
        const config = useRuntimeConfig();

        const query = toQuery(offset, limit, null, null, { direction_id: direction });
        let path = `/api/private/site/collection/read?${query}`;

        if (!config.public.development && offset === 0 && limit === 30) {
          if (direction) {
            path = `/storage/json/collections/${direction}.json?cacheDate=${cacheDate}`;
          } else {
            path = `/storage/json/collections/all.json?cacheDate=${cacheDate}`;
          }
        }

        const response = await axios.get<IResponseItems<ICollection>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.list = response.data.data;

        return response.data;
      } catch (error) {
        this.list = null;

        throw error;
      }
    },
    async linkCollection(
      link: string,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<ICollection>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? `/api/private/site/collection/link/${link}`
          : `/storage/json/collections/link/${link}.json?cacheDate=${cacheDate}`;

        const response = await axios.get<IResponseItem<ICollection>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.itemLinkCollection = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkCollection = null;

        throw error;
      }
    },
  },
});
