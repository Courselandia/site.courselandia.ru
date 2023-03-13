import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import ICourse from '@/interfaces/stores/course/course';
import IDescription from '@/interfaces/stores/course/description';
import IFilter from '@/interfaces/stores/course/filter';

export default defineStore('course', {
  state: () => ({
    ratedCourses: null as ICourse[] | null,
    searchedCourses: null as ICourse[] | null,
    searchedTotal: null as number | null,
    course: null as ICourse | null,
    courses: null as ICourse[] | null,
    total: null as number | null,
    filter: null as IFilter | null,
    section: null as string | null,
    description: null as IDescription | null,
  }),
  actions: {
    async readCourses(
      baseUrl: string,
      offset: number = 0,
      limit: number = 36,
      sorts: ISorts | null = null,
      filters: IFilters | null = null,
      openedItems: Record<string, boolean> | null = null,
    ): Promise<IResponseItems<ICourse>> {
      try {
        const query = toQuery(offset, limit, sorts, filters, openedItems);
        const response = await axios.get<IResponseItems<ICourse>>(`/api/private/site/course/read?${query}`, {
          baseURL: baseUrl,
        });

        this.courses = response.data.data.courses;
        this.total = response.data.data.total;
        this.filter = response.data.data.filter;
        this.section = response.data.data.section;
        this.description = response.data.data.description;

        return response.data;
      } catch (error) {
        this.courses = null;
        this.total = null;
        this.filter = null;
        this.section = null;
        this.description = null;

        throw error;
      }
    },
    async readRatedCourses(
      baseUrl: string,
      limit: number = 12,
    ): Promise<IResponseItems<ICourse>> {
      try {
        const query = toQuery(null, limit);
        const response = await axios.get<IResponseItems<ICourse>>(`/api/private/site/course/read/rated?${query}`, {
          baseURL: baseUrl,
        });

        this.ratedCourses = response.data.data.courses;

        return response.data;
      } catch (error) {
        this.ratedCourses = null;

        throw error;
      }
    },
    async readSearchedCourses(
      baseUrl: string,
      search: string,
      limit: number = 12,
    ): Promise<IResponseItems<ICourse> | null> {
      if (search) {
        try {
          const response = await axios.get<IResponseItems<ICourse>>(
            `/api/private/site/course/read/search?limit=${limit}&search=${encodeURIComponent(search)}`,
            {
              baseURL: baseUrl,
            },
          );

          this.searchedCourses = response.data.data.courses;
          this.searchedTotal = response.data.data.total;

          return response.data;
        } catch (error) {
          this.searchedCourses = null;

          throw error;
        }
      }

      return null;
    },
    async getCourse(
      baseUrl: string,
      school: string,
      course: string,
    ): Promise<IResponseItem<ICourse | null>> {
      try {
        const response = await axios.get<IResponseItem<ICourse>>(`/api/private/site/course/get/${school}/${course}`, {
          baseURL: baseUrl,
        });

        this.course = response.data.data;

        return response.data;
      } catch (error) {
        this.course = null;

        throw error;
      }
    },
  },
});
