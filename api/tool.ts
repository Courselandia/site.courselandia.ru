import ECacheDate from '@/enums/cache';
import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IFilterTool from '@/interfaces/stores/course/filterTool';
import type IToolLink from '@/interfaces/stores/course/toolLink';
import tool from '@/stores/tool';

export const apiReadTools = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterTool>> => {
  const {
    readTools,
  } = tool();

  const loadTools = async ():
    Promise<IResponseItems<IFilterTool>> => readTools(offset, limit, filters);

  const resultTools = await useAsyncData('tools', async () => loadTools());

  return resultTools.data.value?.data || [];
};

export const apiLinkTool = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IToolLink | null> => {
  const {
    linkTool,
  } = tool();

  const loadTool = async ():
    Promise<IResponseItem<IToolLink>> => linkTool(link, cacheDate);

  const resultTool = await useAsyncData('tool', async () => loadTool());

  return resultTool.data.value?.data || null;
};
