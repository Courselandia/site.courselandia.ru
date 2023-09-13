import IFilters from '@/interfaces/filters';
import { IResponseItem, IResponseItems } from '@/interfaces/response';
import IFilterSkill from '@/interfaces/stores/course/filterSkill';
import ISkillLink from '@/interfaces/stores/course/skillLink';
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

  return resultSkills.data.value?.data || [];
};

export const apiGetSkill = async (
  apiUrl: string,
  id: TId,
): Promise<IFilterSkill | null> => {
  const {
    getSkill,
  } = skill();

  const loadSkills = async ():
    Promise<IResponseItem<IFilterSkill | null>> => getSkill(apiUrl, id);

  const resultSkill = await useAsyncData('skill', async () => loadSkills());

  return resultSkill.data.value?.data || null;
};

export const apiLinkSkill = async (
  apiUrl: string,
  link: string,
): Promise<ISkillLink | null> => {
  const {
    linkSkill,
  } = skill();

  const loadSkills = async ():
    Promise<IResponseItem<ISkillLink | null>> => linkSkill(apiUrl, link);

  const resultSkill = await useAsyncData('skill', async () => loadSkills());

  return resultSkill.data.value?.data || null;
};
