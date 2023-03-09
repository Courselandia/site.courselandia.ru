import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import skill from '@/stores/skill';
import TId from '@/types/id';

export const apiReadSkills = async (
  apiUrl: string,
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterSkill>> => {
  const {
    readSkills,
  } = skill();

  const loadSkills = async ():
    Promise<IResponseItems<IFilterSkill>> => readSkills(apiUrl, offset, limit, filters);

  const resultSkills = await useAsyncData('skills', async () => loadSkills());

  return resultSkills.data.value?.data;
};

export const apiGetSkill = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterSkill | null> => {
  const {
    getSkill,
  } = skill();

  const loadCategories = async ():
    Promise<IResponseItem<IFilterSkill | null>> => getSkill(apiUrl, id);

  const resultCategories = await useAsyncData('skill', async () => loadCategories());

  return resultCategories.data.value?.data || null;
};
