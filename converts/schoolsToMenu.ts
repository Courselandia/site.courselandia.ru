import IMenu from '@/interfaces/menu';
import IDirection from '@/interfaces/stores/school/school';

const schoolsToMenu = (
  schools: Array<IDirection>,
): Array<IMenu> => {
  const result: Array<IMenu> = [];

  schools.forEach((school) => {
    const index = result.length;

    result[index] = {
      label: school.name,
      link: `courses/school/${school.link}`,
    };
  });

  return result;
};

export default schoolsToMenu;
