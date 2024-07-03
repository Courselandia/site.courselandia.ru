import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ISchool from '@/interfaces/stores/promo/school';

export default defineStore('promo', {
  state: () => ({
    list: null as Array<ISchool> | null,
    itemLinkPromo: null as ISchool | null,
  }),
  actions: {
    async readPromos(
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<ISchool>> {
      try {
        const config = useRuntimeConfig();
        let path = '/api/private/site/promo/read';

        if (!config.public.development) {
          path = `/storage/json/promos.json?cacheDate=${cacheDate}`;
        }

        const response = await axios.get<IResponseItems<ISchool>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.list = response.data.data;

        return response.data;
      } catch (error) {
        this.list = null;

        throw error;
      }
    },
    async linkPromo(
      link: string,
      cacheDate: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<ISchool>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? `/api/private/site/promo/link/${link}`
          : `/storage/json/promos/${link}.json?cacheDate=${cacheDate}`;

        const response = await axios.get<IResponseItem<ISchool>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.itemLinkPromo = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkPromo = null;

        throw error;
      }
    },
  },
});
