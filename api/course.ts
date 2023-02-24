import { storeToRefs } from 'pinia';

import IApiReadSearchedCourses from '@/interfaces/api/course/apiReadSearchedCourses';
import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import ICourse from '@/interfaces/stores/course/course';
import IDirection from '@/interfaces/stores/course/direction';
import course from '@/stores/course';

export const apiReadDirections = async (apiUrl: string): Promise<Array<IDirection>> => {
  const {
    readDirections,
  } = course();

  const loadDirections = async ():
    Promise<IResponseItems<IDirection>> => readDirections(apiUrl);

  const { directions } = storeToRefs(course());

  if (directions.value) {
    return directions.value;
  }

  const resultDirections = await useAsyncData('directions', async () => loadDirections());

  return resultDirections.data.value?.data;
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

    let response: IApiReadSearchedCourses;

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
    readCourse,
  } = course();

  const index = `${schoolLink}-${courseLink}`;

  if (courseItems[index]) {
    return courseItems[index];
  }

  const loadGetCourse = async ():
    Promise<IResponseItem<ICourse> | null> => await readCourse(apiUrl, schoolLink, courseLink);

  const resultCourse = await useAsyncData('course', async () => loadGetCourse());

  if (resultCourse.data.value?.data) {
    courseItems[index] = resultCourse.data.value?.data;

    return resultCourse.data.value?.data;
  }

  return null;
};
