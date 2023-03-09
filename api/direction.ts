import { storeToRefs } from 'pinia';

import {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import IFilterDirection from '@/interfaces/stores/course/filterDirection';
import direction from '@/stores/direction';
import TId from '@/types/id';

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

export const apiGetDirection = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterDirection | null> => {
  const {
    getDirection,
  } = direction();

  const loadCategories = async ():
    Promise<IResponseItem<IFilterDirection | null>> => getDirection(apiUrl, id);

  const resultCategories = await useAsyncData('direction', async () => loadCategories());

  return resultCategories.data.value?.data || null;
};
