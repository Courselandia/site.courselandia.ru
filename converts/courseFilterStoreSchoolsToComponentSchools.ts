import ISchool from '@/interfaces/components/molecules/schoolFilter';
import IFilterSchool from '@/interfaces/stores/course/filterSchool';

export const courseFilterStoreSchoolsToComponentSchools = (
  schools: Array<IFilterSchool>,
): Array<ISchool> => {
  const result: Array<ISchool> = [];

  schools.forEach((school) => {
    result[result.length] = {
      id: school.id,
      label: school.name,
      link: school.link,
    };
  });

  return result;
};
