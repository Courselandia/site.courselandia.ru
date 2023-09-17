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
    async readSchools(baseUrl: string, development: boolean): Promise<IResponseItems<ISchool>> {
      try {
        const path = development ? '/api/private/site/school/read' : '/storage/json/schools.json';
        const response = await axios.get<IResponseItems<ISchool>>(path, {
          baseURL: baseUrl,
        });

        this.schools = response.data.data;

        return response.data;
      } catch (error) {
        this.schools = null;

        throw error;
      }
    },
    async linkSchool(
      baseUrl: string,
      development: boolean,
      link: string,
    ): Promise<IResponseItem<ISchoolLink>> {
      try {
        const path = development ? `/api/private/site/school/link/${link}` : `/storage/json/schools/${link}.json`;

        const response = await axios.get<IResponseItem<ISchoolLink>>(path, {
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
