import { storeToRefs } from 'pinia';

import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import IApiReadSearchedCourses from '@/interfaces/api/course/apiReadSearchedCourses';
import IFilters from '@/interfaces/filters';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import ICourse from '@/interfaces/stores/course/course';
import course from '@/stores/course';

export const apiReadCourses = async (
  apiUrl: string,
  offset: number = 0,
  limit: number = 36,
  sorts: ISorts | null = null,
  filters: IFilters | null = null,
): Promise<IApiReadCourses> => {
  const {
    readCourses,
  } = course();

  const loadRatedCourses = async ():
    Promise<IResponseItems<ICourse>> => readCourses(apiUrl, offset, limit, sorts, filters);

  const {
    total,
    filter,
    section,
    description,
  } = storeToRefs(course());

  const resultCourses = await useAsyncData('courses', async () => loadRatedCourses());

  return {
    courses: resultCourses.data.value?.data.courses,
    filter: filter.value,
    section: section.value,
    description: description.value,
    total: total.value,
  };
};

export const apiReadRatedCourses = async (
  apiUrl: string,
  limit: number = 12,
): Promise<Array<ICourse>> => {
  const {
    readRatedCourses,
  } = course();

  const loadRatedCourses = async ():
    Promise<IResponseItems<ICourse>> => readRatedCourses(apiUrl, limit);

  const { ratedCourses } = storeToRefs(course());

  if (ratedCourses.value) {
    return ratedCourses.value;
  }

  const resultCourses = await useAsyncData('ratedCourses', async () => loadRatedCourses());

  return resultCourses.data.value?.data.courses;
};

export const apiReadSearchedCourses = async (
  apiUrl: string,
  search: string,
  limit: number = 12,
): Promise<IApiReadSearchedCourses | null> => {
  if (search) {
    const {
      readSearchedCourses,
    } = course();

    const loadReadSearchedCourses = async ():
      Promise<IResponseItems<ICourse> | null> => readSearchedCourses(apiUrl, search, limit);

    const {
      searchedTotal,
    } = storeToRefs(course());

    const resultCourses = await useAsyncData('searchedCourses', async () => loadReadSearchedCourses());

    return {
      courses: resultCourses.data.value?.data.courses,
      total: searchedTotal.value,
    };
  }

  return null;
};

const courseItems: Record<string, ICourse> = {};

export const apiGetCourse = async (
  apiUrl: string,
  schoolLink: string,
  courseLink: string,
): Promise<ICourse | null> => {
  const {
    getCourse,
  } = course();

  const index = `${schoolLink}-${courseLink}`;

  if (courseItems[index]) {
    return courseItems[index];
  }

  const loadGetCourse = async ():
    Promise<IResponseItem<ICourse> | null> => await getCourse(apiUrl, schoolLink, courseLink);

  const resultCourse = await useAsyncData('course', async () => loadGetCourse());

  if (resultCourse.data.value?.data) {
    courseItems[index] = resultCourse.data.value?.data;

    return resultCourse.data.value?.data;
  }

  return null;
};
