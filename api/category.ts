import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';
import category from '@/stores/category';
import TId from '@/types/id';

export const apiReadCategories = async (
  apiUrl: string,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterCategory>> => {
  const {
    readCategories,
  } = category();

  const loadCategories = async ():
    Promise<IResponseItems<IFilterCategory>> => readCategories(apiUrl, offset, limit, filters);

  const resultCategories = await useAsyncData('categories', async () => loadCategories());

  return resultCategories.data.value?.data;
};

export const apiGetCategory = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterCategory | null> => {
  const {
    getCategory,
  } = category();

  const loadCategories = async ():
    Promise<IResponseItem<IFilterCategory | null>> => getCategory(apiUrl, id);

  const resultCategories = await useAsyncData('category', async () => loadCategories());

  return resultCategories.data.value?.data || null;
};
