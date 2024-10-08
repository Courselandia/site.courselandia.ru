import { defineStore } from 'pinia';

import ECacheDate from '@/enums/cache';
import axios from '@/helpers/axios';
import { cacheDate } from '@/helpers/cache';
import toQuery from '@/helpers/toQuery';
import type IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseData,
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import type ICourse from '@/interfaces/stores/course/course';
import type ICourseResponse from '@/interfaces/stores/course/courseResponse';
import type ISchoolLink from '@/interfaces/stores/course/directionLink';
import type IFilter from '@/interfaces/stores/course/filter';
import type IProfessionLink from '@/interfaces/stores/course/professionLink';
import type IDirectionLink from '@/interfaces/stores/course/schoolLink';
import type ISkillLink from '@/interfaces/stores/course/skillLink';
import type IStat from '@/interfaces/stores/course/stat';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';
import type IToolLink from '@/interfaces/stores/course/toolLink';
import type TId from '@/types/id';

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
    stat: null as IStat | null,
  }),
  actions: {
    async readCourses(
      offset: number = 0,
      limit: number = 21,
      sorts: ISorts | null = null,
      filters: IFilters | null = null,
      openedItems: Record<string, boolean> | null = null,
      section: string | null = null,
      sectionLink: string | null = null,
      cd: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseData<IApiReadCourses>> {
      try {
        const config = useRuntimeConfig();
        const additional: Record<string, string | boolean | null> | null = openedItems || {};

        additional.section = section;
        additional.sectionLink = sectionLink;

        const query = toQuery(offset, limit, sorts, filters, additional);
        let path = `/api/private/site/course/read?${query}`;

        const hasInitFilter = (
          flts: IFilters | null = null,
        ): boolean => Object.keys(flts || {}).length === 1 || Object.keys(flts || {}).length === 0;
        const hasFilter = Object.keys(filters || {}).length !== 0;

        const hasOpenedItem = (itms: Record<string, string | boolean | null> | null): boolean => {
          if (itms) {
            return Boolean(itms.openedCategories
              || itms.openedProfessions
              || itms.openedSchools
              || itms.openedSkills
              || itms.openedTeachers
              || itms.openedTools);
          }

          return false;
        };

        if (
          !config.public.development
          && offset === 0
          && limit === 21
          && sorts?.name === 'ASC'
          && hasInitFilter(filters)
          && !hasOpenedItem(openedItems)
          && section
          && sectionLink
        ) {
          path = `/storage/json/courses/${section}/${sectionLink}.json?cd=${cacheDate(cd)}`;
        } else if (
          !config.public.development
          && offset === 0
          && limit === 21
          && sorts?.name === 'ASC'
          && section === null
          && sectionLink === null
          && !hasFilter
        ) {
          path = `/storage/json/courses.json?cd=${cacheDate(cd)}`;
        }

        const response = await axios.get<IResponseData<IApiReadCourses>>(path, {
          baseURL: config.public.apiUrl,
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
      search: string,
      limit: number = 12,
    ): Promise<IResponseItems<ICourse> | null> {
      if (search) {
        try {
          const config = useRuntimeConfig();

          const response = await axios.get<IResponseItems<ICourse>>(
            `/api/private/site/course/read/search?limit=${limit}&search=${encodeURIComponent(search)}`,
            {
              baseURL: config.public.apiUrl,
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
      school: string,
      course: string,
      cd: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItem<ICourseResponse | null>> {
      try {
        const config = useRuntimeConfig();

        const path = config.public.development
          ? `/api/private/site/course/get/${school}/${course}`
          : `/storage/json/courses/show/${school}/${course}.json?cd=${cacheDate(cd)}`;
        const response = await axios.get<IResponseItem<ICourseResponse>>(path, {
          baseURL: config.public.apiUrl,
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
      favorites: TId[],
    ): Promise<IResponseItems<ICourse> | null> {
      try {
        const config = useRuntimeConfig();

        const response = await axios.get<IResponseItems<ICourse>>(
          '/api/private/site/course/read/favorites',
          {
            baseURL: config.public.apiUrl,
            params: {
              ids: favorites,
            },
          },
        );

        this.favoriteCourses = response.data.data;

        return response.data;
      } catch (error) {
        this.favoriteCourses = null;

        throw error;
      }
    },
    async getStatCourses(cd: ECacheDate = ECacheDate.DAY): Promise<IResponseItem<IStat>> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? '/api/private/site/course/stat'
          : `/storage/json/stat.json?cd=${cacheDate(cd)}`;

        const response = await axios.get<IResponseItem<IStat>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.stat = response.data.data;

        return response.data;
      } catch (error) {
        this.stat = null;

        throw error;
      }
    },
    async readRatedCourses(
      cd: ECacheDate = ECacheDate.DAY,
    ): Promise<IResponseItems<ICourse> | null> {
      try {
        const config = useRuntimeConfig();
        const path = config.public.development
          ? '/api/private/site/course/read/rated'
          : `/storage/json/courses/rated.json?cd=${cacheDate(cd)}`;

        const response = await axios.get<IResponseItems<ICourse>>(path, {
          baseURL: config.public.apiUrl,
        });

        this.ratedCourses = response.data.data;

        return response.data;
      } catch (error) {
        this.ratedCourses = null;

        throw error;
      }
    },
  },
});
