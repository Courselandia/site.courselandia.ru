import ECacheDate from '@/enums/cache';
import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import type IFilterCategory from '@/interfaces/stores/course/filterCategory';
import category from '@/stores/category';

export const apiReadCategories = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterCategory>> => {
  const {
    readCategories,
  } = category();

  const loadCategories = async ():
    Promise<IResponseItems<IFilterCategory>> => readCategories(
    offset,
    limit,
    filters,
  );

  const resultCategories = await useAsyncData('categories', async () => loadCategories());

  return resultCategories.data.value?.data || [];
};

export const apiLinkCategory = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ICategoryLink | null> => {
  const {
    linkCategory,
  } = category();

  const loadCategories = async ():
    Promise<IResponseItem<ICategoryLink>> => linkCategory(
    link,
    cacheDate,
  );

  const resultCategory = await useAsyncData('category', async () => loadCategories());

  return resultCategory.data.value?.data || null;
};
