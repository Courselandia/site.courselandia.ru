import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type ISchool from '@/interfaces/stores/school/school';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
    courseSchools: null as ISchool[] | null,
    itemLinkSchool: null as ISchoolLink | null,
  }),
  actions: {
    async readSchools(): Promise<IResponseItems<ISchool>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development ? '/api/private/site/school/read' : '/storage/json/schools.json';
        const response = await axios.get<IResponseItems<ISchool>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.schools = response.data.data;

        return response.data;
      } catch (error) {
        this.schools = null;

        throw error;
      }
    },
    async readCourseSchools(
      offset: number | null = null,
      limit: number | null = null,
      filters: IFilters | null = null,
    ): Promise<IResponseItems<ISchool>> {
      try {
        const config = useRuntimeConfig();
        const query = toQuery(offset, limit, null, filters);
        const response = await axios.get<IResponseItems<ISchool>>(`/api/private/site/course/schools?${query}`, {
          baseURL: config.public.apiUrl,
        });

        this.courseSchools = response.data.data;

        return response.data;
      } catch (error) {
        this.courseSchools = null;

        throw error;
      }
    },
    async linkSchool(
      link: string,
    ): Promise<IResponseItem<ISchoolLink>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development ? `/api/private/site/school/link/${link}` : `/storage/json/schools/${link}.json`;
        const response = await axios.get<IResponseItem<ISchoolLink>>(path, {
          baseURL: config.public.apiUrl,
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
