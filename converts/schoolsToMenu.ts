import IMenu from '@/interfaces/menu';
import ISchool from '@/interfaces/stores/school/school';

const schoolsToMenu = (
  schools: Array<ISchool>,
): Array<IMenu> => {
  const result: Array<IMenu> = [];

  schools.forEach((school) => {
    const index = result.length;

    result[index] = {
      label: school.name,
      link: `/courses/school/${school.link}`,
    };
  });

  return result;
};

export default schoolsToMenu;
