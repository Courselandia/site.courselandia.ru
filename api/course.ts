import { storeToRefs } from 'pinia';

import ECacheDate from '@/enums/cache';
import type IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import type IApiReadSearchedCourses from '@/interfaces/api/course/apiReadSearchedCourses';
import type IFilters from '@/interfaces/filters';
import type {
  IResponseData,
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type ICourse from '@/interfaces/stores/course/course';
import type ICourseResponse from '@/interfaces/stores/course/courseResponse';
import type IStat from '@/interfaces/stores/course/stat';
import course from '@/stores/course';
import type TId from '@/types/id';

export const apiReadCourses = async (
  offset: number = 0,
  limit: number = 18,
  sorts: ISorts | null = null,
  filters: IFilters | null = null,
  openedItems: Record<string, boolean> | null = null,
  sectionValue: string | null = null,
  sectionLink: string | null = null,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IApiReadCourses> => {
  const {
    readCourses,
  } = course();

  const loadCourses = async ():
    Promise<IResponseData<IApiReadCourses>> => readCourses(
    offset,
    limit,
    sorts,
    filters,
    openedItems,
    sectionValue,
    sectionLink,
    cacheDate,
  );

  const {
    total,
    filter,
    section,
    description,
  } = storeToRefs(course());

  const resultCourses = await useAsyncData('courses', async () => loadCourses());

  return {
    courses: resultCourses.data.value?.data.courses || [],
    filter: filter.value,
    section: section.value,
    description: description.value,
    total: total.value,
  };
};

export const apiReadSearchedCourses = async (
  search: string,
  limit: number = 12,
): Promise<IApiReadSearchedCourses | null> => {
  if (search) {
    const {
      readSearchedCourses,
    } = course();

    const loadReadSearchedCourses = async ():
      Promise<IResponseItems<ICourse> | null> => readSearchedCourses(
      search,
      limit,
    );

    const {
      searchedTotal,
    } = storeToRefs(course());

    const resultCourses = await useAsyncData('searchedCourses', async () => loadReadSearchedCourses());

    return {
      courses: resultCourses.data.value?.data || [],
      total: searchedTotal.value,
    };
  }

  return null;
};

export const apiReadFavoritesCourses = async (
  ids: TId[],
): Promise<Array<ICourse>> => {
  const {
    readFavoriteCourses,
  } = course();

  const loadReadFavoritesCourses = async ():
    Promise<IResponseItems<ICourse> | null> => readFavoriteCourses(ids);

  const resultCourses = await useAsyncData('searchedCourses', async () => loadReadFavoritesCourses());

  return resultCourses.data.value?.data || [];
};

const courseItems: Record<string, ICourseResponse> = {};

export const apiGetCourse = async (
  schoolLink: string,
  courseLink: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ICourseResponse | null> => {
  const {
    getCourse,
  } = course();

  const index = `${schoolLink}-${courseLink}`;

  if (courseItems[index]) {
    return courseItems[index];
  }

  const loadGetCourse = async ():
    Promise<IResponseItem<ICourseResponse | null>> => await getCourse(
    schoolLink,
    courseLink,
    cacheDate,
  );

  const resultCourse = await useAsyncData('course', async () => loadGetCourse());

  if (resultCourse.data.value?.data) {
    courseItems[index] = resultCourse.data.value?.data;

    return resultCourse.data.value?.data;
  }

  return null;
};

export const apiGetStatCourses = async (
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IStat | null> => {
  const {
    getStatCourses,
  } = course();

  const loadGetCourse = async ():
    Promise<IResponseItem<IStat>> => await getStatCourses(cacheDate);

  const resultCourse = await useAsyncData('statCourses', async () => loadGetCourse());

  return resultCourse.data.value?.data || null;
};

export const apiReadRatedCourses = async (
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<Array<ICourse>> => {
  const {
    readRatedCourses,
  } = course();

  const loadReadRatedCourses = async ():
    Promise<IResponseItems<ICourse> | null> => readRatedCourses(cacheDate);

  const resultCourses = await useAsyncData('ratedCourses', async () => loadReadRatedCourses());

  return resultCourses.data.value?.data || [];
};
