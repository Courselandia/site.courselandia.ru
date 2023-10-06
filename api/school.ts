import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';
import school from '@/stores/school';

export const apiReadSchools = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<ISchool>> => {
  const {
    readSchools,
  } = school();

  const loadSchools = async ():
    Promise<IResponseItems<ISchool>> => readSchools(offset, limit, filters);

  const resultSchools = await useAsyncData('schools', async () => loadSchools());

  return resultSchools.data.value?.data || [];
};
