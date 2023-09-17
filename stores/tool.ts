import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterTool from '@/interfaces/stores/course/filterTool';
import IToolLink from '@/interfaces/stores/course/toolLink';
import TId from '@/types/id';

export default defineStore('tool', {
  state: () => ({
    tools: null as IFilterTool[] | null,
    itemLinkTool: null as IToolLink | null,
  }),
  actions: {
    async readTools(
      baseUrl: string,
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterTool>> {
      try {
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterTool>>(`/api/private/site/course/tools?${query}`, {
          baseURL: baseUrl,
        });

        this.tools = response.data.data;

        return response.data;
      } catch (error) {
        this.tools = null;

        throw error;
      }
    },
    async linkTool(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<IToolLink>> {
      try {
        const path = development ? `/api/private/site/tool/link/${link}` : `/storage/json/tools/${link}.json`;

        const response = await axios.get<IResponseItem<IToolLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkTool = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkTool = null;

        throw error;
      }
    },
  },
});
