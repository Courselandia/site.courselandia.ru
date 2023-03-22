import { defineStore } from 'pinia';

import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import IFilters from '@/interfaces/filters';
import {
  IResponseData,
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import ICategoryLink from '@/interfaces/stores/course/categoryLink';
import ICourse from '@/interfaces/stores/course/course';
import ISchoolLink from '@/interfaces/stores/course/directionLink';
import IFilter from '@/interfaces/stores/course/filter';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import IDirectionLink from '@/interfaces/stores/course/schoolLink';
import ISkillLink from '@/interfaces/stores/course/skillLink';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import IToolLink from '@/interfaces/stores/course/toolLink';

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
    description: null as ICategoryLink
      | IDirectionLink
      | IProfessionLink
      | ISchoolLink
      | ISkillLink
      | ITeacherLink
      | IToolLink
      | null,
  }),
  actions: {
    async readCourses(
      baseUrl: string,
      offset: number = 0,
      limit: number = 36,
      sorts: ISorts | null = null,
      filters: IFilters | null = null,
      openedItems: Record<string, boolean> | null = null,
      section: string | null = null,
      sectionLink: string | null = null,
    ): Promise<IResponseData<IApiReadCourses>> {
      try {
        const additional: Record<string, string | boolean | null> | null = openedItems || {};

        additional.section = section;
        additional.sectionLink = sectionLink;

        const query = toQuery(offset, limit, sorts, filters, additional);
        const response = await axios.get<IResponseData<IApiReadCourses>>(`/api/private/site/course/read?${query}`, {
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

        this.ratedCourses = response.data.data;

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

          this.searchedCourses = response.data.data;
          this.searchedTotal = response.data.total;

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
