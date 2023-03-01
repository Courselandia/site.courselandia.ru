import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import IFilterCategory from '@/interfaces/stores/course/filterCategory';
import category from '@/stores/category';

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

  const resultCategories = await useAsyncData('categorys', async () => loadCategories());

  return resultCategories.data.value?.data;
};
