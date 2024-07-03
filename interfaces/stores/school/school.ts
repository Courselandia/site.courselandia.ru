import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type IPromocode from '@/interfaces/stores/promo/promocode';
import type ISchoolAmountCourses from '@/interfaces/stores/school/schoolAmountCourses';
import type TId from '@/types/id';

export default interface ISchool {
  id: TId;
  name: string,
  header: string,
  link: string,
  text: string | null,
  site: string,
  referral: string,
  rating: number,
  image_logo: IImage | null,
  image_site: IImage | null,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
  reviews_count: number;
  amount_courses: ISchoolAmountCourses,
  promocode: IPromocode | null,
}
