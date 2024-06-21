import { defineStore } from 'pinia';

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
    async readPromos(): Promise<IResponseItems<ISchool>> {
      try {
        const config = useRuntimeConfig();
        let path = '/api/private/site/promo/read';

        if (!config.public.development) {
          path = '/storage/json/promos.json';
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
    async linkPromo(link: string): Promise<IResponseItem<ISchool>> {
      const config = useRuntimeConfig();
      const path = config.public.development ? `/api/private/site/promo/link/${link}` : `/storage/json/promos/${link}.json`;

      const response = await axios.get<IResponseItem<ISchool>>(path, {
        baseURL: config.public.apiUrl,
      });

      return response.data;
    },
  },
});
