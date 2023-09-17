import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterProfession from '@/interfaces/stores/course/filterProfession';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import TId from '@/types/id';

export default defineStore('profession', {
  state: () => ({
    professions: null as IFilterProfession[] | null,
    itemLinkProfession: null as IProfessionLink | null,
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
    async linkProfession(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<IProfessionLink>> {
      try {
        const path = development ? `/api/private/site/profession/link/${link}` : `/storage/json/professions/${link}.json`;

        const response = await axios.get<IResponseItem<IProfessionLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkProfession = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkProfession = null;

        throw error;
      }
    },
  },
});
