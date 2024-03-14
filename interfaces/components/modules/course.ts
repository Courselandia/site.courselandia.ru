import ECurrency from '@/enums/components/modules/catalog/currency';
import EDuration from '@/enums/components/modules/catalog/duration';
import ELanguage from '@/enums/components/modules/catalog/language';
import type ICategory from '@/interfaces/components/modules/catalog/category';
import type IDirection from '@/interfaces/components/modules/catalog/direction';
import type ILevel from '@/interfaces/components/modules/catalog/level';
import type ISkill from '@/interfaces/components/modules/catalog/skill';
import type ITeacher from '@/interfaces/components/modules/catalog/teacher';
import type ITool from '@/interfaces/components/modules/catalog/tool';
import type IEmployment from '@/interfaces/components/modules/course/employment';
import type IFeature from '@/interfaces/components/modules/course/feature';
import type ILearn from '@/interfaces/components/modules/course/learn';
import type IProcess from '@/interfaces/components/modules/course/process';
import type IProgram from '@/interfaces/components/modules/course/program';
import type IProfession from '@/interfaces/components/modules/profession';
import type ISchool from '@/interfaces/components/modules/school';
import type IMetatag from '@/interfaces/components/molecules/metatag';
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
