import ECacheDate from '@/enums/cache';
import type {
  IResponseItem,
} from '@/interfaces/response';
import type IList from '@/interfaces/stores/publication/list';
import type IPublication from '@/interfaces/stores/publication/publication';
import publication from '@/stores/publication';

export const apiReadPublications = async (
  fetch: boolean,
  offset: number = 0,
  limit: number = 20,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IList | null> => {
  const {
    readPublications,
  } = publication();

  const loadPublications = async ():
    Promise<IResponseItem<IList>> => readPublications(
    offset,
    limit,
    cacheDate,
  );

  if (fetch) {
    const resultPublications = await useAsyncData('publications', async () => loadPublications());

    return resultPublications.data.value?.data || null;
  }

  const result = await loadPublications();

  return result.data;
};

export const apiLinkPublication = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IPublication | null> => {
  const {
    linkPublication,
  } = publication();

  const loadPublication = async ():
    Promise<IResponseItem<IPublication>> => linkPublication(
    link,
    cacheDate,
  );

  const resultPublication = await useAsyncData('publication', async () => loadPublication());

  return resultPublication.data.value?.data || null;
};
