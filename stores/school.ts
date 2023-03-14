import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISchool from '@/interfaces/stores/school/school';
import TId from '@/types/id';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
    itemSchool: null as ISchool | null,
    itemLinkSchool: null as ISchoolLink | null,
  }),
  actions: {
    async readSchools(baseUrl: string): Promise<IResponseItems<ISchool>> {
      try {
        const response = await axios.get<IResponseItems<ISchool>>('/api/private/site/school/read', {
          baseURL: baseUrl,
        });

        this.schools = response.data.data;

        return response.data;
      } catch (error) {
        this.schools = null;

        throw error;
      }
    },
    async getSchool(baseUrl: string, id: TId): Promise<IResponseItem<ISchool>> {
      try {
        const response = await axios.get<IResponseItem<ISchool>>(`/api/private/site/school/get/${id}`, {
          baseURL: baseUrl,
        });

        this.itemSchool = response.data.data;

        return response.data;
      } catch (error) {
        this.itemSchool = null;

        throw error;
      }
    },
    async linkSchool(baseUrl: string, link: string): Promise<IResponseItem<ISchoolLink>> {
      try {
        console.log(`/api/private/site/school/link/${link}`);
        const response = await axios.get<IResponseItem<ISchoolLink>>(`/api/private/site/school/link/${link}`, {
          baseURL: baseUrl,
        });

        this.itemLinkSchool = response.data.data;

        return response.data;
      } catch (error) {
        this.itemLinkSchool = null;

        throw error;
      }
    },
  },
});
