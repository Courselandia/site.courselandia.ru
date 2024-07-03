import ECacheDate from '@/enums/cache';
import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IFilterProfession from '@/interfaces/stores/course/filterProfession';
import type IProfessionLink from '@/interfaces/stores/course/professionLink';
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

export const apiLinkProfession = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<IProfessionLink | null> => {
  const {
    linkProfession,
  } = profession();

  const loadProfession = async ():
    Promise<IResponseItem<IProfessionLink>> => linkProfession(
    link,
    cacheDate,
  );

  const resultProfession = await useAsyncData('profession', async () => loadProfession());

  return resultProfession.data.value?.data || null;
};
