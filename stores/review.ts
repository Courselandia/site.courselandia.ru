import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItems,
} from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import IReview from '@/interfaces/stores/review/review';
import TId from '@/types/id';

export default defineStore('review', {
  state: () => ({
    reviews: null as IReview[] | null,
    total: null as number | null,
  }),
  actions: {
    async readReviews(
      baseUrl: string,
      school: TId,
      offset: number = 0,
      limit: number = 36,
      sorts: ISorts | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IReview>> {
      try {
        const additional: Record<string, TId> | null = {};

        additional.school_id = school;

        const query = toQuery(offset, limit, sorts, filters, additional);
        const response = await axios.get<IResponseItems<IReview>>(`/api/private/site/review/read?${query}`, {
          baseURL: baseUrl,
        });

        this.reviews = response.data.data;
        this.total = response.data.total;

        return response.data;
      } catch (error) {
        this.reviews = null;
        this.total = null;

        throw error;
      }
    },
  },
});
