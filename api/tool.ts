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

  const loadTool = async ():
    Promise<IResponseItem<IFilterTool | null>> => getTool(apiUrl, id);

  const resultTool = await useAsyncData('tool', async () => loadTool());

  return resultTool.data.value?.data || null;
};

export const apiLinkTool = async (
  apiUrl: string,
  link: string,
): Promise<IFilterTool | null> => {
  const {
    linkTool,
  } = tool();

  const loadTool = async ():
    Promise<IResponseItem<IFilterTool | null>> => linkTool(apiUrl, link);

  const resultTool = await useAsyncData('tool', async () => loadTool());

  return resultTool.data.value?.data || null;
};
