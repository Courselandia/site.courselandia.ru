import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItems,
} from '@/interfaces/response';
import IFilterProfession from '@/interfaces/stores/course/filterProfession';
import IProfessionLink from '@/interfaces/stores/course/professionLink';

export default defineStore('profession', {
  state: () => ({
    professions: null as IFilterProfession[] | null,
    itemLinkProfession: null as IProfessionLink | null,
  }),
  actions: {
    async readProfessions(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterProfession>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterProfession>>(`/api/private/site/course/professions?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.professions = response.data.data;

        return response.data;
      } catch (error) {
        this.professions = null;

        throw error;
      }
    },
  },
});
