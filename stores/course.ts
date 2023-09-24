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
import ICourseResponse from '@/interfaces/stores/course/courseResponse';
import ISchoolLink from '@/interfaces/stores/course/directionLink';
import IFilter from '@/interfaces/stores/course/filter';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import IDirectionLink from '@/interfaces/stores/course/schoolLink';
import ISkillLink from '@/interfaces/stores/course/skillLink';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';
import IToolLink from '@/interfaces/stores/course/toolLink';
import TId from '@/types/id';

export default defineStore('course', {
  state: () => ({
    ratedCourses: null as ICourse[] | null,
    searchedCourses: null as ICourse[] | null,
    searchedTotal: null as number | null,
    favoriteCourses: null as ICourse[] | null,
    course: null as ICourse | null,
    similarities: null as ICourse[] | null,
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
      development: boolean,
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
        let path = `/api/private/site/course/read?${query}`;

        const hasInitFilter = (flts: IFilters | null = null): boolean => {
          const hasOneFilter = Object.keys(flts || {}).length === 1;

          return (
            hasOneFilter
            && flts !== null
            && (
              flts['directions-id'] !== undefined
              || flts['school-id'] !== undefined
              || flts['categories-id'] !== undefined
              || flts['professions-id'] !== undefined
              || flts['teachers-id'] !== undefined
              || flts['skills-id'] !== undefined
              || flts['tools-id'] !== undefined
            )
          );
        };

        if (
          !development
          && offset === 0
          && limit === 36
          && sorts?.name === 'ASC'
          && hasInitFilter(filters)
          && Object.keys(openedItems || {}).length === 0
          && section
          && sectionLink
        ) {
          path = `/storage/json/courses/${section}/${sectionLink}.json`;
        }

        const response = await axios.get<IResponseData<IApiReadCourses>>(path, {
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
      development: boolean,
      school: string,
      course: string,
    ): Promise<IResponseItem<ICourseResponse | null>> {
      try {
        const path = development ? `/api/private/site/course/get/${school}/${course}` : `/storage/json/courses/show/${school}/${course}.json`;
        const response = await axios.get<IResponseItem<ICourseResponse>>(path, {
          baseURL: baseUrl,
        });

        if (response?.data?.data?.course) {
          this.course = response.data.data.course;
          this.similarities = response.data.data.similarities;

          return response.data;
        }

        return response.data;
      } catch (error) {
        this.course = null;

        throw error;
      }
    },
    async readFavoriteCourses(
      baseUrl: string,
      favorites: TId[],
    ): Promise<IResponseItems<ICourse> | null> {
      try {
        const response = await axios.get<IResponseItems<ICourse>>(
          '/api/private/site/course/read/favorites',
          {
            baseURL: baseUrl,
            params: {
              ids: favorites,
            },
          },
        );

        this.favoriteCourses = response.data.data;

        return response.data;
      } catch (error) {
        this.searchedCourses = null;

        throw error;
      }
    },
  },
});
