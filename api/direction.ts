import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IDirection from '@/interfaces/stores/course/direction';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';
import direction from '@/stores/direction';

export const apiReadDirections = async (): Promise<Array<IDirection>> => {
  const {
    readDirections,
  } = direction();

  const loadDirections = async ():
    Promise<IResponseItems<IDirection>> => readDirections();

  const resultDirections = await useAsyncData('directions', async () => loadDirections());

  return resultDirections.data.value?.data || [];
};

export const apiLinkDirection = async (
  link: string,
): Promise<IDirectionLink | null> => {
  const {
    linkDirection,
  } = direction();

  const loadDirection = async ():
    Promise<IResponseItem<IDirectionLink>> => linkDirection(
    link,
  );

  const resultDirection = await useAsyncData('direction', async () => loadDirection());

  return resultDirection.data.value?.data || null;
};
