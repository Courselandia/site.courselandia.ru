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
    itemProfession: null as IFilterProfession | null,
    itemLinkProfession: null as IProfessionLink | null,
  }),
  actions: {
    async readProfessions(
      baseUrl: string,
      development: boolean,
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
    async getProfession(
      baseUrl: string,
      development: boolean,
      id: TId,
    ): Promise<IResponseItem<IFilterProfession>> {
      try {
        const response = await axios.get<IResponseItem<IFilterProfession>>(`/api/private/site/profession/get/${id}`, {
          baseURL: baseUrl,
        });

        this.itemProfession = response.data.data;

        return response.data;
      } catch (error) {
        this.itemProfession = null;

        throw error;
      }
    },
    async linkProfession(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<IProfessionLink>> {
      try {
        const response = await axios.get<IResponseItem<IProfessionLink>>(`/api/private/site/profession/link/${link}`, {
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
