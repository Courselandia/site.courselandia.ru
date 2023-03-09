import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import TId from '@/types/id';

export default defineStore('skill', {
  state: () => ({
    skills: null as IFilterSkill[] | null,
    skill: null as IFilterSkill | null,
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
    async getSkill(baseUrl: string, id: TId): Promise<IResponseItem<IFilterSkill>> {
      try {
        const response = await axios.get<IResponseItem<IFilterSkill>>(`/api/private/site/skill/get/${id}`, {
          baseURL: baseUrl,
        });

        this.skill = response.data.data;

        return response.data;
      } catch (error) {
        this.skill = null;

        throw error;
      }
    },
  },
});
