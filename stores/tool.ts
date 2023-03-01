import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItems,
} from '@/interfaces/response';
import IFilterTool from '@/interfaces/stores/course/filterTool';

export default defineStore('tool', {
  state: () => ({
    tools: null as IFilterTool[] | null,
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
  },
});
