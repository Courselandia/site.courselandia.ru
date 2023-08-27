import {
  IResponseItems,
} from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import IReview from '@/interfaces/stores/review/review';
import review from '@/stores/review';

export const apiReadReviews = async (
  apiUrl: string,
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
    apiUrl,
    school,
    offset,
    limit,
    sorts,
    rating,
  );

  const resultReviews = await useAsyncData('reviews', async () => loadReviews());

  return resultReviews.data.value || null;
};
