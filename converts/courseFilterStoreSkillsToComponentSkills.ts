import type ISkill from '@/interfaces/components/molecules/skill';
import type IFilterSkill from '@/interfaces/stores/course/filterSkill';

export const courseFilterStoreSkillsToComponentSkills = (
  skills: Array<IFilterSkill>,
): Array<ISkill> => {
  const result: Array<ISkill> = [];

  skills.forEach((skill) => {
    result[result.length] = {
      id: skill.id,
      label: skill.name,
      link: skill.link,
      disabled: skill.disabled,
    };
  });

  return result;
};
