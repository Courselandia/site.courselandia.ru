import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterTool from '@/interfaces/stores/course/filterTool';
import tool from '@/stores/tool';
import TId from '@/types/id';

export const apiReadTools = async (
  apiUrl: string,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterTool>> => {
  const {
    readTools,
  } = tool();

  const loadTools = async ():
    Promise<IResponseItems<IFilterTool>> => readTools(apiUrl, offset, limit, filters);

  const resultTools = await useAsyncData('tools', async () => loadTools());

  return resultTools.data.value?.data;
};

export const apiGetTool = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterTool | null> => {
  const {
    getTool,
  } = tool();

  const loadCategories = async ():
    Promise<IResponseItem<IFilterTool | null>> => getTool(apiUrl, id);

  const resultCategories = await useAsyncData('tool', async () => loadCategories());

  return resultCategories.data.value?.data || null;
};
