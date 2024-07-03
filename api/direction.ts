import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IDirection from '@/interfaces/stores/course/direction';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';
import direction from '@/stores/direction';
import ECacheDate from '@/enums/cache';

export const apiReadDirections = async (
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<Array<IDirection>> => {
  const {
    readDirections,
  } = direction();

  const loadDirections = async ():
    Promise<IResponseItems<IDirection>> => readDirections(cacheDate);

  const resultDirections = await useAsyncData('directions', async () => loadDirections());

  return resultDirections.data.value?.data || [];
};

export const apiLinkDirection = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IDirectionLink | null> => {
  const {
    linkDirection,
  } = direction();

  const loadDirection = async ():
    Promise<IResponseItem<IDirectionLink>> => linkDirection(
    link,
    cacheDate,
  );

  const resultDirection = await useAsyncData('direction', async () => loadDirection());

  return resultDirection.data.value?.data || null;
};
