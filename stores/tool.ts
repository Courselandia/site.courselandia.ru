import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type IFilterTool from '@/interfaces/stores/course/filterTool';
import type IToolLink from '@/interfaces/stores/course/toolLink';

export default defineStore('tool', {
  state: () => ({
    tools: null as IFilterTool[] | null,
    itemLinkTool: null as IToolLink | null,
  }),
  actions: {
    async readTools(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterTool>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterTool>>(`/api/private/site/course/tools?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.tools = response.data.data;

        return response.data;
      } catch (error) {
        this.tools = null;

        throw error;
      }
    },
    async linkTool(
      link: string,
    ): Promise<IResponseItem<IToolLink>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development ? `/api/private/site/tool/link/${link}` : `/storage/json/tools/${link}.json`;

        const response = await axios.get<IResponseItem<IToolLink>>(path, {
          baseURL: config.public.apiUrl,
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
