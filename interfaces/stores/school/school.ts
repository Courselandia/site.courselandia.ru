import IImage from '@/interfaces/stores/image/image';
import IMetatag from '@/interfaces/stores/metatag/metatag';
import ISchoolAmountCourses from '@/interfaces/stores/school/schoolAmountCourses';
import TId from '@/types/id';

export default interface ISchool {
  id: TId;
  name: string,
  header: string,
  link: string,
  text: string | null,
  site: string | null,
  rating: number,
  image_logo_id: IImage | null,
  image_site_id: IImage | null,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  reviews_count: number;
  amount_courses: ISchoolAmountCourses;
}
