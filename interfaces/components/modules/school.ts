import type IPromocode from '@/interfaces/stores/promo/promocode';
import type TId from '@/types/id';

export default interface ISchool {
    id: TId,
    name: string,
    image?: string | null,
    link: string,
    promocode: IPromocode | null,
}
