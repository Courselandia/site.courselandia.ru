import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type {
  IResponseItem,
} from '@/interfaces/response';
import type IList from '@/interfaces/stores/publication/list';
import type IPublication from '@/interfaces/stores/publication/publication';

export default defineStore('publication', {
  state: () => ({
    list: null as IList | null,
    itemLinkPublication: null as IPublication | null,
  }),
  actions: {
    async readPublications(
      offset: number = 0,
      limit: number = 20,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<IList>> {
      try {
        const config = useRuntimeConfig();

        const query = toQuery(offset, limit);
        let path = `/api/private/site/publication/read?${query}`;

        if (!config.public.development && offset === 0 && limit === 20) {
          path = `/storage/json/publications.json?cacheDate=${cacheDate}`;
        }

        const response = await axios.get<IResponseItem<IList>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.list = response.data.data;

        return response.data;
      } catch (error) {
        this.list = null;

        throw error;
      }
    },
    async linkPublication(
      link: string,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<IPublication>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? `/api/private/site/publication/link/${link}`
          : `/storage/json/publications/${link}.json?cacheDate=${cacheDate}`;

        const response = await axios.get<IResponseItem<IPublication>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.itemLinkPublication = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkPublication = null;

        throw error;
      }
    },
  },
});
