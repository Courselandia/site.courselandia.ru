import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import { cacheDate } from '@/helpers/cache';
import type { IResponseItems } from '@/interfaces/response';
import type IFaq from '@/interfaces/stores/faq/faq';

export default defineStore('faq', {
  state: () => ({
    faqs: null as IFaq[] | null,
  }),
  actions: {
    async readFaqs(
      school: string,
      cd: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<IFaq>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? `/api/private/site/faq/read/${school}`
          : `/storage/json/faqs/${school}.json?cd=${cacheDate(cd)}`;
        const response = await axios.get<IResponseItems<IFaq>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.faqs = response.data.data;

        return response.data;
      } catch (error) {
        this.faqs = null;

        throw error;
      }
    },
  },
});
