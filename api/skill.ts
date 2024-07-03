import ECacheDate from '@/enums/cache';
import type IFilters from '@/interfaces/filters';
import type { IResponseItem, IResponseItems } from '@/interfaces/response';
import type IFilterSkill from '@/interfaces/stores/course/filterSkill';
import type ISkillLink from '@/interfaces/stores/course/skillLink';
import skill from '@/stores/skill';

export const apiReadSkills = async (
  offset: number | null = null,
  limit: number | null = null,
  filters: IFilters | null = null,
): Promise<Array<IFilterSkill>> => {
  const {
    readSkills,
  } = skill();

  const loadSkills = async ():
    Promise<IResponseItems<IFilterSkill>> => readSkills(
    offset,
    limit,
    filters,
  );

  const resultSkills = await useAsyncData('skills', async () => loadSkills());

  return resultSkills.data.value?.data || [];
};

export const apiLinkSkill = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ISkillLink | null> => {
  const {
    linkSkill,
  } = skill();

  const loadSkill = async ():
    Promise<IResponseItem<ISkillLink>> => linkSkill(
    link,
    cacheDate,
  );

  const resultSkill = await useAsyncData('skill', async () => loadSkill());

  return resultSkill.data.value?.data || null;
};
