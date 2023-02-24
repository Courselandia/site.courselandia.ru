import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ELanguage from '@/enums/components/molecules/language';
import ICategory from '@/interfaces/components/molecules/category';
import IDirection from '@/interfaces/components/molecules/direction';
import IMetatag from '@/interfaces/components/molecules/metatag';
import IProfession from '@/interfaces/components/molecules/profession';
import ISchool from '@/interfaces/components/molecules/school';
import ISkill from '@/interfaces/components/molecules/skill';
import TId from '@/types/id';

export default interface ICourse {
    id: TId,
    name: string,
    link: string,
    url: string,
    rating: number | null,
    image: string | null,
    price: number | null;
    price_old: number | null;
    price_recurrent_price: number | null;
    currency: ECurrency | null;
    duration: number | null;
    duration_unit: EDuration | null;
    lessons_amount: number | null;
    school: ISchool | null,

    text?: string | null,
    language?: ELanguage | null,
    online?: boolean | null,
    employment?: boolean | null,
    modules_amount?: number | null;
    metatag?: IMetatag | null,
    directions?: Array<IDirection> | null,
    professions?: Array<IProfession> | null,
    categories?: Array<ICategory> | null,
    skills?: Array<ISkill> | null,
    teachers?: Array<ITeacher> | null,
}
