import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ICategory from '@/interfaces/stores/course/category';
import ICategoryLink from '@/interfaces/stores/course/categoryLink';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';
import TId from '@/types/id';

export default defineStore('category', {
  state: () => ({
    categories: null as IFilterCategory[] | null,
    itemLinkCategory: null as ICategoryLink | null,
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
    async linkCategory(
      baseUrl: string,
      development: boolean,
      link: TId,
    ): Promise<IResponseItem<ICategoryLink | null>> {
      try {
        const path = development ? `/api/private/site/category/link/${link}` : `/storage/json/categories/${link}.json`;
        const response = await axios.get<IResponseItem<ICategoryLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkCategory = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkCategory = null;

        throw error;
      }
    },
  },
});
