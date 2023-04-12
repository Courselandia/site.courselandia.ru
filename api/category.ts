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

  return resultCategories.data.value?.data || [];
};

export const apiGetCategory = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterCategory | null> => {
  const {
    getCategory,
  } = category();

  const loadCategory = async ():
    Promise<IResponseItem<IFilterCategory | null>> => getCategory(apiUrl, id);

  const resultCategory = await useAsyncData('category', async () => loadCategory());

  return resultCategory.data.value?.data || null;
};

export const apiLinkCategory = async (
  apiUrl: string,
  link: string,
): Promise<IFilterCategory | null> => {
  const {
    linkCategory,
  } = category();

  const loadCategory = async ():
    Promise<IResponseItem<IFilterCategory | null>> => linkCategory(apiUrl, link);

  const resultCategory = await useAsyncData('category', async () => loadCategory());

  return resultCategory.data.value?.data || null;
};
