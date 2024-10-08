import type ISchool from '@/interfaces/components/modules/catalog/schoolFilter';
import type IFilterSchool from '@/interfaces/stores/course/filterSchool';

export const courseFilterStoreSchoolsToComponentSchools = (
  schools: Array<IFilterSchool>,
): Array<ISchool> => {
  const result: Array<ISchool> = [];

  schools.forEach((school) => {
    result[result.length] = {
      id: school.id,
      label: school.name,
      link: school.link,
      disabled: school.disabled,
    };
  });

  return result;
};
