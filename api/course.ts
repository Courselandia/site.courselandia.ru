import { storeToRefs } from 'pinia';

import { IResponseItems } from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import course from '@/stores/course';

// eslint-disable-next-line import/prefer-default-export
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
