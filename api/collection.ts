import ECacheDate from '@/enums/cache';
import EDirection from '@/enums/direction';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ICollection from '@/interfaces/stores/collection/collection';
import collection from '@/stores/collection';

export const apiReadCollections = async (
  fetch: boolean,
  offset: number = 0,
  limit: number = 20,
  direction: EDirection | null = null,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IResponseItems<ICollection> | null> => {
  const {
    readCollections,
  } = collection();

  const loadCollections = async ():
    Promise<IResponseItems<ICollection>> => readCollections(
    offset,
    limit,
    direction,
    cacheDate,
  );

  if (fetch) {
    const resultCollections = await useAsyncData('collections', async () => loadCollections());

    return resultCollections.data.value || null;
  }

  return await loadCollections();
};

export const apiLinkCollection = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ICollection | null> => {
  const {
    linkCollection,
  } = collection();

  const loadCollection = async ():
    Promise<IResponseItem<ICollection>> => linkCollection(link, cacheDate);

  const resultCollection = await useAsyncData('collection', async () => loadCollection());

  return resultCollection.data.value?.data || null;
};
