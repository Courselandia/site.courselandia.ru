import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterProfession from '@/interfaces/stores/course/filterProfession';
import TId from '@/types/id';

export default defineStore('profession', {
  state: () => ({
    professions: null as IFilterProfession[] | null,
    profession: null as IFilterProfession | null,
  }),
  actions: {
    async readProfessions(
      baseUrl: string,
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterProfession>> {
      try {
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterProfession>>(`/api/private/site/course/professions?${query}`, {
          baseURL: baseUrl,
        });

        this.professions = response.data.data;

        return response.data;
      } catch (error) {
        this.professions = null;

        throw error;
      }
    },
    async getProfession(baseUrl: string, id: TId): Promise<IResponseItem<IFilterProfession>> {
      try {
        const response = await axios.get<IResponseItem<IFilterProfession>>(`/api/private/site/profession/get/${id}`, {
          baseURL: baseUrl,
        });

        this.profession = response.data.data;

        return response.data;
      } catch (error) {
        this.profession = null;

        throw error;
      }
    },
  },
});
