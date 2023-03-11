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
): Promise<IDirection | null> => {
  const {
    getDirection,
  } = direction();

  const loadDirection = async ():
    Promise<IResponseItem<IDirection | null>> => getDirection(apiUrl, id);

  const resultCategories = await useAsyncData('direction', async () => loadDirection());

  return resultCategories.data.value?.data || null;
};

export const apiLinkDirection = async (
  apiUrl: string,
  link: string,
): Promise<IDirection | null> => {
  const {
    linkDirection,
  } = direction();

  const loadDirection = async ():
    Promise<IResponseItem<IDirection | null>> => linkDirection(apiUrl, link);

  const resultDirection = await useAsyncData('direction', async () => loadDirection());

  return resultDirection.data.value?.data || null;
};
