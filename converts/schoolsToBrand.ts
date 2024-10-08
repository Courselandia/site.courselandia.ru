import type IBrand from '@/interfaces/components/modules/home/brands';
import type ISchool from '@/interfaces/stores/school/school';

const schoolsToBrand = (
  schools: Array<ISchool> | null,
): Array<IBrand> => {
  const result: Array<IBrand> = [];

  if (schools) {
    schools.forEach((school) => {
      const index = result.length;

      result[index] = {
        label: school.name,
        path: `/courses/school/${school.link}`,
        image: school.image_logo?.path || null,
        width: school.image_logo?.width || null,
        height: school.image_logo?.height || null,
      };
    });
  }

  return result;
};

export default schoolsToBrand;
