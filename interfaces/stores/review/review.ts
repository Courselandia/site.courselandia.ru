import ICourse from '@/interfaces/stores/course/course';
import ISchool from '@/interfaces/stores/school/school';
import TId from '@/types/id';

export default interface IReview {
  id: TId;
  school_id: TId,
  course_id: TId | null,
  source: string;
  name: string | null;
  title: string | null;
  review: string | null;
  advantages: string | null;
  disadvantages: string | null;
  rating: number;
  school: ISchool;
  course: ICourse | null;
  created_at: string;
}
