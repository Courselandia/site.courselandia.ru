import type {
  IResponseItem,
} from '@/interfaces/response';
import type IList from '@/interfaces/stores/publication/list';
import publication from '@/stores/publication';

export const apiReadPublications = async (
  fetch: boolean,
  offset: number = 0,
  limit: number = 20,
): Promise<IResponseItem<IList> | null> => {
  const {
    readPublications,
  } = publication();

  const loadPublications = async ():
    Promise<IResponseItem<IList>> => readPublications(
    offset,
    limit,
  );

  if (fetch) {
    const resultPublications = await useAsyncData('publications', async () => loadPublications());

    return resultPublications.data.value || null;
  }

  return await loadPublications();
};
