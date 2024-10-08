import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import { cacheDate } from '@/helpers/cache';
import toQuery from '@/helpers/toQuery';
import type {
  IResponseItems,
} from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type IReview from '@/interfaces/stores/review/review';

export default defineStore('review', {
  state: () => ({
    reviews: null as IReview[] | null,
    total: null as number | null,
  }),
  actions: {
    async readReviews(
      school: string,
      offset: number = 0,
      limit: number = 20,
      sorts: ISorts | null = null,
      rating: number | null = null,
      cd: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<IReview>> {
      try {
        const config = useRuntimeConfig();
        const additional: Record<string, string | number> | null = {};

        additional.link = school;

        if (rating) {
          additional.rating = rating;
        }

        const query = toQuery(offset, limit, sorts, null, additional);
        let path = `/api/private/site/review/read?${query}`;

        if (!config.public.development && offset === 0 && limit === 20 && sorts?.created_at === 'DESC' && !rating) {
          path = `/storage/json/reviews/${school}.json?cd=${cacheDate(cd)}`;
        }

        const response = await axios.get<IResponseItems<IReview>>(path, {
          baseURL: config.public.apiUrl,
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
