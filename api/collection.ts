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
): Promise<IResponseItems<ICollection> | null> => {
  const {
    readCollections,
  } = collection();

  const loadCollections = async ():
    Promise<IResponseItems<ICollection>> => readCollections(
    offset,
    limit,
    direction,
  );

  if (fetch) {
    const resultCollections = await useAsyncData('collections', async () => loadCollections());

    return resultCollections.data.value || null;
  }

  return await loadCollections();
};

export const apiLinkCollection = async (
  fetch: boolean,
  link: string,
): Promise<ICollection | null> => {
  const {
    linkCollection,
  } = collection();

  const loadCollection = async ():
    Promise<IResponseItem<ICollection>> => linkCollection(link);

  if (fetch) {
    const resultCollection = await useAsyncData('collection', async () => loadCollection());

    return resultCollection.data.value?.data || null;
  }

  const result = await loadCollection();

  return result.data;
};
