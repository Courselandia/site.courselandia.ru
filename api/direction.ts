import { storeToRefs } from 'pinia';

import { IResponseItems } from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import direction from '@/stores/direction';

export const apiReadDirections = async (apiUrl: string): Promise<Array<IDirection>> => {
  const {
    readDirections,
  } = direction();

  const loadDirections = async ():
    Promise<IResponseItems<IDirection>> => readDirections(apiUrl);

  const { directions } = storeToRefs(direction());

  if (directions.value) {
    return directions.value;
  }

  const resultDirections = await useAsyncData('directions', async () => loadDirections());

  return resultDirections.data.value?.data;
};
