import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ISchool from '@/interfaces/components/molecules/school';
import TId from '@/types/id';

export default interface ICourse {
    id: TId,
    name: string,
    link: string,
    url: string,
    rating: number,
    image: string | null,
    price: number | null;
    price_old: number | null;
    price_recurrent_price: number | null;
    currency: ECurrency | null;
    duration: number | null;
    duration_unit: EDuration | null;
    lessons_amount: number | null;
    school: ISchool,
}
