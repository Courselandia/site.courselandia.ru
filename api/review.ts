import type {
  IResponseItems,
} from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type IReview from '@/interfaces/stores/review/review';
import review from '@/stores/review';

export const apiReadReviews = async (
  fetch: boolean,
  school: string,
  offset: number = 0,
  limit: number = 36,
  sorts: ISorts | null = null,
  rating: number | null = null,
): Promise<IResponseItems<IReview> | null> => {
  const {
    readReviews,
  } = review();

  const loadReviews = async ():
    Promise<IResponseItems<IReview>> => readReviews(
    school,
    offset,
    limit,
    sorts,
    rating,
  );

  if (fetch) {
    const resultReviews = await useAsyncData(`reviews_${school}`, async () => loadReviews());

    return resultReviews.data.value || null;
  }

  return await loadReviews();
};
