import type IFilters from '@/interfaces/filters';
import type { IResponseItems } from '@/interfaces/response';
import type IFilterTool from '@/interfaces/stores/course/filterTool';
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
