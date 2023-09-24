import IFilters from '@/interfaces/filters';
import { IResponseItems } from '@/interfaces/response';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import skill from '@/stores/skill';

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
    Promise<IResponseItems<IFilterSkill>> => readSkills(
    apiUrl,
    offset,
    limit,
    filters,
  );

  const resultSkills = await useAsyncData('skills', async () => loadSkills());

  return resultSkills.data.value?.data || [];
};
