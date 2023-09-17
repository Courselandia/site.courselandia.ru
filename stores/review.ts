import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
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
      development: boolean,
      school: string,
      offset: number = 0,
      limit: number = 20,
      sorts: ISorts | null = null,
      rating: number | null = null,
    ): Promise<IResponseItems<IReview>> {
      try {
        const additional: Record<string, string | number> | null = {};

        additional.link = school;

        if (rating) {
          additional.rating = rating;
        }

        const query = toQuery(offset, limit, sorts, null, additional);
        let path = `/api/private/site/review/read?${query}`;

        if (development && offset === 0 && limit === 20 && sorts?.created_at === 'DESC' && !rating) {
          path = `/storage/json/reviews/${school}.json`;
        }

        const response = await axios.get<IResponseItems<IReview>>(path, {
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
