import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import type { IResponseItems } from '@/interfaces/response';
import type IFaq from '@/interfaces/stores/faq/faq';

export default defineStore('faq', {
  state: () => ({
    faqs: null as IFaq[] | null,
  }),
  actions: {
    async readFaqs(
      school: string,
    ): Promise<IResponseItems<IFaq>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development ? `/api/private/site/faq/read/${school}` : `/storage/json/faqs/${school}.json`;
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
