import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';
import TId from '@/types/id';

export default defineStore('category', {
  state: () => ({
    categories: null as IFilterCategory[] | null,
    category: null as IFilterCategory | null,
  }),
  actions: {
    async readCategories(
      baseUrl: string,
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterCategory>> {
      try {
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterCategory>>(`/api/private/site/course/categories?${query}`, {
          baseURL: baseUrl,
        });

        this.categories = response.data.data;

        return response.data;
      } catch (error) {
        this.categories = null;

        throw error;
      }
    },
    async getCategory(baseUrl: string, id: TId): Promise<IResponseItem<IFilterCategory | null>> {
      try {
        const response = await axios.get<IResponseItem<IFilterCategory>>(`/api/private/site/category/get/${id}`, {
          baseURL: baseUrl,
        });

        this.category = response.data.data;

        return response.data;
      } catch (error) {
        this.category = null;

        throw error;
      }
    },
  },
});
