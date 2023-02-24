import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ELanguage from '@/enums/components/molecules/language';
import ICategory from '@/interfaces/components/molecules/category';
import IDirection from '@/interfaces/components/molecules/direction';
import IEmployment from '@/interfaces/components/molecules/employment';
import IFeature from '@/interfaces/components/molecules/feature';
import ILearn from '@/interfaces/components/molecules/learn';
import ILevel from '@/interfaces/components/molecules/level';
import IMetatag from '@/interfaces/components/molecules/metatag';
import IProcess from '@/interfaces/components/molecules/process';
import IProfession from '@/interfaces/components/molecules/profession';
import ISchool from '@/interfaces/components/molecules/school';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
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
    tools?: Array<ITool> | null,
    processes?: Array<IProcess> | null,
    levels?: Array<ILevel> | null,
    learns?: Array<ILearn> | null,
    employments?: Array<IEmployment> | null,
    features?: Array<IFeature> | null,
}
