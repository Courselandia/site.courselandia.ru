import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseItems,
} from '@/interfaces/response';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import type IFilterCategory from '@/interfaces/stores/course/filterCategory';

export default defineStore('category', {
  state: () => ({
    categories: null as IFilterCategory[] | null,
    itemLinkCategory: null as ICategoryLink | null,
  }),
  actions: {
    async readCategories(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterCategory>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterCategory>>(`/api/private/site/course/categories?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.categories = response.data.data;

        return response.data;
      } catch (error) {
        this.categories = null;

        throw error;
      }
    },
  },
});
