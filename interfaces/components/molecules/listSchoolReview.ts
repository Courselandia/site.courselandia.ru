import ISchoolAmountCourses from '@/interfaces/stores/school/schoolAmountCourses';
import TId from '@/types/id';

export default interface IListSchoolReview {
  id?: TId,
  label: string
  link: string,
  path: string,
  reviews: number,
  rating: number,
  text: string | null;
  image: string | null,
  site: string | null;
  amount_courses: ISchoolAmountCourses;
}
