import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterTool from '@/interfaces/stores/course/filterTool';
import IToolLink from '@/interfaces/stores/course/toolLink';
import tool from '@/stores/tool';
import TId from '@/types/id';

export const apiReadTools = async (
  apiUrl: string,
  development: boolean,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterTool>> => {
  const {
    readTools,
  } = tool();

  const loadTools = async ():
    Promise<IResponseItems<IFilterTool>> => readTools(apiUrl, development, offset, limit, filters);

  const resultTools = await useAsyncData('tools', async () => loadTools());

  return resultTools.data.value?.data || [];
};

export const apiGetTool = async (
  apiUrl: string,
  development: boolean,
  id: TId,
): Promise<IFilterTool | null> => {
  const {
    getTool,
  } = tool();

  const loadTool = async ():
    Promise<IResponseItem<IFilterTool | null>> => getTool(apiUrl, development, id);

  const resultTool = await useAsyncData('tool', async () => loadTool());

  return resultTool.data.value?.data || null;
};

export const apiLinkTool = async (
  apiUrl: string,
  development: boolean,
  link: string,
): Promise<IToolLink | null> => {
  const {
    linkTool,
  } = tool();

  const loadTool = async ():
    Promise<IResponseItem<IToolLink | null>> => linkTool(apiUrl, development, link);

  const resultTool = await useAsyncData('tool', async () => loadTool());

  return resultTool.data.value?.data || null;
};
