import IBrand from '@/interfaces/components/organism/brands';
import ISchool from '@/interfaces/stores/school/school';

const schoolsToBrand = (
  schools: Array<ISchool>,
): Array<IBrand> => {
  const result: Array<IBrand> = [];

  schools.forEach((school) => {
    const index = result.length;

    result[index] = {
      label: school.name,
      url: `courses/school/${school.link}`,
      image: school.image_logo_id?.path || null,
    };
  });

  return result;
};

export default schoolsToBrand;
