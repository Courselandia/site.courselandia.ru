import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import ISkillLink from '@/interfaces/stores/course/skillLink';

export default defineStore('skill', {
  state: () => ({
    skills: null as IFilterSkill[] | null,
    itemLinkSkill: null as ISkillLink | null,
  }),
  actions: {
    async readSkills(
      baseUrl: string,
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<IFilterSkill>> {
      try {
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<IFilterSkill>>(`/api/private/site/course/skills?${query}`, {
          baseURL: baseUrl,
        });

        this.skills = response.data.data;

        return response.data;
      } catch (error) {
        this.skills = null;

        throw error;
      }
    },
    async linkSkill(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<ISkillLink>> {
      try {
        const path = development ? `/api/private/site/skill/link/${link}` : `/storage/json/skills/${link}.json`;

        const response = await axios.get<IResponseItem<ISkillLink>>(path, {
          baseURL: baseUrl,
        });

        this.itemLinkSkill = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkSkill = null;

        throw error;
      }
    },
  },
});
