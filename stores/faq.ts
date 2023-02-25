import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import IFaq from '@/interfaces/stores/faq/faq';

export default defineStore('faq', {
  state: () => ({
    faqs: null as IFaq[] | null,
  }),
  actions: {
    async readFaqs(baseUrl: string, school: string): Promise<IResponseItems<IFaq>> {
      try {
        const response = await axios.get<IResponseItems<IFaq>>(`/api/private/site/faq/read/${school}`, {
          baseURL: baseUrl,
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
