import type IDirectionLink from '@/interfaces/stores/course/directionLink';
import type ISkillLink from '@/interfaces/stores/course/skillLink';
import type ITeacherExperience from '@/interfaces/stores/course/teacherExperience';
import type IImage from '@/interfaces/stores/image/image';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type ISocialMedia from '@/interfaces/stores/socialMedia';
import type TId from '@/types/id';

export default interface ITeacherLink {
  id: TId;
  name: string,
  link: string,
  header: string,
  text: string | null,
  additional: string | null,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string | null,
  rating: number | null,
  image_small: IImage | null,
  image_middle: IImage | null,
  image_big: IImage | null,
  directions: Array<IDirectionLink>,
  schools: Array<ISkillLink>,
  copied: boolean;
  city: string | null;
  experiences: ITeacherExperience[];
  social_medias: ISocialMedia[];
}
