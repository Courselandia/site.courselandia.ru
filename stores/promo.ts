import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import type {
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
  },
});
