import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import ISchool from '@/interfaces/stores/school/school';

const schoolsToSchoolReviews = (
  schools: Array<ISchool> | null,
): Array<IListSchoolReview> => {
  const result: Array<IListSchoolReview> = [];

  if (schools) {
    schools.forEach((school) => {
      const index = result.length;

      result[index] = {
        label: school.name,
        link: school.link,
        path: `/courses/school/${school.link}`,
        reviews: school.reviews_count,
        rating: school.rating,
        text: school.text,
        image: school.image_logo_id?.path || null,
        site: school.site,
        amount_courses: school.amount_courses,
      };
    });
  }

  return result;
};

export default schoolsToSchoolReviews;
