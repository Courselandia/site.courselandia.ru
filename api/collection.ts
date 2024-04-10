import EDirection from '@/enums/direction';
import type {
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
