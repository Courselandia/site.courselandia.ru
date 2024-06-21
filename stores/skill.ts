import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type IFilterSkill from '@/interfaces/stores/course/filterSkill';
import type ISkillLink from '@/interfaces/stores/course/skillLink';

export default defineStore('skill', {
  state: () => ({
    skills: null as IFilterSkill[] | null,
    itemLinkSkill: null as ISkillLink | null,
  }),
  actions: {
    async readSkills(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterSkill>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterSkill>>(`/api/private/site/course/skills?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.skills = response.data.data;

        return response.data;
      } catch (error) {
        this.skills = null;

        throw error;
      }
    },
    async linkSkill(
      link: string,
    ): Promise<IResponseItem<ISkillLink>> {
      const config = useRuntimeConfig();
      const path = config.public.development ? `/api/private/site/skill/link/${link}` : `/storage/json/skills/${link}.json`;

      const response = await axios.get<IResponseItem<ISkillLink>>(path, {
        baseURL: config.public.apiUrl,
      });

      return response.data;
    },
  },
});
