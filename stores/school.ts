import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISchool from '@/interfaces/stores/school/school';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
    itemLinkSchool: null as ISchoolLink | null,
  }),
  actions: {
    async readSchools(
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

        this.schools = response.data.data;

        return response.data;
      } catch (error) {
        this.schools = null;

        throw error;
      }
    },
  },
});
