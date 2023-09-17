import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterProfession from '@/interfaces/stores/course/filterProfession';
import IProfessionLink from '@/interfaces/stores/course/professionLink';
import profession from '@/stores/profession';
import TId from '@/types/id';

export const apiReadProfessions = async (
  apiUrl: string,
  development: boolean,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterProfession>> => {
  const {
    readProfessions,
  } = profession();

  const loadProfessions = async ():
    Promise<IResponseItems<IFilterProfession>> => readProfessions(
    apiUrl,
    development,
    offset,
    limit,
    filters,
  );

  const resultProfessions = await useAsyncData('professions', async () => loadProfessions());

  return resultProfessions.data.value?.data || [];
};

export const apiGetProfession = async (
  apiUrl: string,
  development: boolean,
  id: TId,
): Promise<IFilterProfession | null> => {
  const {
    getProfession,
  } = profession();

  const loadProfession = async ():
    Promise<IResponseItem<IFilterProfession | null>> => getProfession(apiUrl, development, id);

  const resultProfession = await useAsyncData('profession', async () => loadProfession());

  return resultProfession.data.value?.data || null;
};

export const apiLinkProfession = async (
  apiUrl: string,
  development: boolean,
  link: string,
): Promise<IProfessionLink | null> => {
  const {
    linkProfession,
  } = profession();

  const loadProfession = async ():
    Promise<IResponseItem<IProfessionLink | null>> => linkProfession(apiUrl, development, link);

  const resultProfession = await useAsyncData('profession', async () => loadProfession());

  return resultProfession.data.value?.data || null;
};
