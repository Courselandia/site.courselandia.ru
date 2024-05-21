import EDiscountType from '@/enums/stores/promo/discountType';
import EType from '@/enums/stores/promo/type';
import type ISchool from '@/interfaces/stores/school/school';
import type TId from '@/types/id';

export default interface IPromocode {
  id: TId,
  school_id: TId,
  uuid: string | null,
  code: string,
  title: string,
  description: string | null,
  min_price: number | null,
  discount: number | null,
  discount_type: EDiscountType,
  date_start: string | null,
  date_end: string | null,
  type: EType,
  url: string,
  status: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: number | null,
  school?: ISchool;
}
