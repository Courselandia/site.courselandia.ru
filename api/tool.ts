import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import IFilterTool from '@/interfaces/stores/course/filterTool';
import tool from '@/stores/tool';

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

  return resultTools.data.value?.data || [];
};
