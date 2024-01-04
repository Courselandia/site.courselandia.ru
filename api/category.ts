import type IFilters from '@/interfaces/filters';
import type { IResponseItems } from '@/interfaces/response';
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
