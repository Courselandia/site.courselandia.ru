import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ELanguage from '@/enums/components/molecules/language';
import type ICategory from '@/interfaces/components/molecules/category';
import type IDirection from '@/interfaces/components/molecules/direction';
import type IEmployment from '@/interfaces/components/molecules/employment';
import type IFeature from '@/interfaces/components/molecules/feature';
import type ILearn from '@/interfaces/components/molecules/learn';
import type ILevel from '@/interfaces/components/molecules/level';
import type IMetatag from '@/interfaces/components/molecules/metatag';
import type IProcess from '@/interfaces/components/molecules/process';
import type IProfession from '@/interfaces/components/molecules/profession';
import type IProgram from '@/interfaces/components/molecules/program';
import type ISchool from '@/interfaces/components/molecules/school';
import type ISkill from '@/interfaces/components/molecules/skill';
import type ITeacher from '@/interfaces/components/molecules/teacher';
import type ITool from '@/interfaces/components/molecules/tool';
import type IImage from '@/interfaces/stores/image/image';
import type TId from '@/types/id';

export default interface ICourse {
    id: TId,
    name: string,
    header: string,
    link: string,
    url: string,
    rating: number | null,
    image: IImage | null,
    price: number | null;
    price_old: number | null;
    price_recurrent: number | null;
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
    program?: Array<IProgram> | null,
}
