import { storeToRefs } from 'pinia';

import { IResponseItems } from '@/interfaces/response';
import ICourse from '@/interfaces/stores/course/course';
import IDirection from '@/interfaces/stores/course/direction';
import course from '@/stores/course';
import ISorts from '@/interfaces/sorts';
import IFilters from '@/interfaces/filters';

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

  try {
    const resultDirections = await useAsyncData('directions', async () => loadDirections());

    return resultDirections.data.value?.data;
  } catch (error: any) {
    console.error(error.message);
  }

  return [];
};

export const apiReadRatedCourses = async (
  apiUrl: string,
  limit: number = 12,
): Promise<Array<ICourse>> => {
  const {
    readRatedCourses,
  } = course();

  const sorts: ISorts = {
    rating: 'DESC',
  };

  const filters: IFilters = {
    price: [70000, 220000],
  };

  const loadRatedCourses = async ():
    Promise<IResponseItems<ICourse>> => readRatedCourses(apiUrl, limit, sorts, filters);

  const { ratedCourses } = storeToRefs(course());

  if (ratedCourses.value) {
    return ratedCourses.value;
  }

  try {
    const resultCourses = await useAsyncData('ratedCourses', async () => loadRatedCourses());

    return resultCourses.data.value?.data.courses;
  } catch (error: any) {
    console.error(error.message);
  }

  return [];
};
