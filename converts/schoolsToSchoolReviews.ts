import type IListSchoolReview from '@/interfaces/components/modules/reviewSchools/listSchoolReview';
import type ISchool from '@/interfaces/stores/school/school';

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
        image: school.image_logo?.path || null,
        site: school.site,
        referral: school.referral,
        amount_courses: school.amount_courses,
      };
    });
  }

  return result;
};

export default schoolsToSchoolReviews;
