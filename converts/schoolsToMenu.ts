import type IMenu from '@/interfaces/menu';
import type ISchool from '@/interfaces/stores/school/school';

const schoolsToMenu = (
  schools: Array<ISchool> | null,
): Array<IMenu> => {
  const result: Array<IMenu> = [];

  if (schools) {
    schools.forEach((school) => {
      const index = result.length;

      result[index] = {
        label: school.name,
        path: `/courses/school/${school.link}`,
        link: school.link,
      };
    });
  }

  return result;
};

export default schoolsToMenu;
