import type IProfession from '@/interfaces/components/modules/profession';
import type IFilterProfession from '@/interfaces/stores/course/filterProfession';

export const courseFilterStoreProfessionsToComponentProfessions = (
  professions: Array<IFilterProfession>,
): Array<IProfession> => {
  const result: Array<IProfession> = [];

  professions.forEach((profession) => {
    result[result.length] = {
      id: profession.id,
      label: profession.name,
      link: profession.link,
      disabled: profession.disabled,
    };
  });

  return result;
};
