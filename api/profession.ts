import type IFilters from '@/interfaces/filters';
import type { IResponseItems } from '@/interfaces/response';
import type IFilterProfession from '@/interfaces/stores/course/filterProfession';
import profession from '@/stores/profession';

export const apiReadProfessions = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterProfession>> => {
  const {
    readProfessions,
  } = profession();

  const loadProfessions = async ():
    Promise<IResponseItems<IFilterProfession>> => readProfessions(
    offset,
    limit,
    filters,
  );

  const resultProfessions = await useAsyncData('professions', async () => loadProfessions());

  return resultProfessions.data.value?.data || [];
};
