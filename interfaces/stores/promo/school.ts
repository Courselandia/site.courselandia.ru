import type IPromocode from '@/interfaces/stores/promo/promocode';
import type IPromotion from '@/interfaces/stores/promo/promotion';
import type ISchool from '@/interfaces/stores/school/school';

export default interface ISchoolPromo extends ISchool {
  promocodes: Array<IPromocode>,
  promotions: Array<IPromotion>,
}
