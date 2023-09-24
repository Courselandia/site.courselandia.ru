import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import ICategoryLink from '@/interfaces/stores/course/categoryLink';
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
    Promise<IResponseItems<IFilterCategory>> => readCategories(
    apiUrl,
    offset,
    limit,
    filters,
  );

  const resultCategories = await useAsyncData('categories', async () => loadCategories());

  return resultCategories.data.value?.data || [];
};

export const apiLinkCategory = async (
  apiUrl: string,
  development: boolean,
  link: string,
): Promise<ICategoryLink | null> => {
  const {
    linkCategory,
  } = category();

  const loadCategory = async ():
    Promise<IResponseItem<ICategoryLink | null>> => linkCategory(apiUrl, development, link);

  const resultCategory = await useAsyncData('category', async () => loadCategory());

  return resultCategory.data.value?.data || null;
};
