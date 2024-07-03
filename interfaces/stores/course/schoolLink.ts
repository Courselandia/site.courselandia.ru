import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type ISchoolAmountCourses from '@/interfaces/stores/school/schoolAmountCourses';
import type TId from '@/types/id';

export default interface ISchoolLink {
  id: TId;
  name: string,
  link: string,
  header: string,
  weight: number,
  text: string | null,
  additional: string | null,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string | null,
  image_logo: IImage | null;
  image_site: IImage | null;
  site: string | null,
  referral: string | null,
  rating: number | null,
  reviews_count: number;
  reviews_1_star_count: number;
  reviews_2_stars_count: number;
  reviews_3_stars_count: number;
  reviews_4_stars_count: number;
  reviews_5_stars_count: number;
  amount_courses: ISchoolAmountCourses;
  amount_teachers: number;
  amount_reviews: number;
}
