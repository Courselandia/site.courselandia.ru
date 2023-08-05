import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import ISchool from '@/interfaces/stores/school/school';

const schoolsToSchoolReviews = (
  schools: Array<ISchool>,
): Array<IListSchoolReview> => {
  const result: Array<IListSchoolReview> = [];

  schools.forEach((school) => {
    const index = result.length;

    result[index] = {
      label: school.name,
      link: `/reviews/${school.link}`,
      reviews: school.reviews_count,
      rating: school.rating,
    };
  });

  return result;
};

export default schoolsToSchoolReviews;
