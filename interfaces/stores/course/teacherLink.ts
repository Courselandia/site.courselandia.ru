import IDirectionLink from '@/interfaces/stores/course/directionLink';
import ISkillLink from '@/interfaces/stores/course/skillLink';
import IImage from '@/interfaces/stores/image/image';
import IMetatag from '@/interfaces/stores/metatag/metatag';
import TId from '@/types/id';

export default interface ITeacherLink {
  id: TId;
  name: string,
  link: string,
  header: string,
  text: string,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string,
  rating: number | null,
  image_small_id: IImage | null,
  image_middle_id: IImage | null,
  directions: Array<IDirectionLink>,
  schools: Array<ISkillLink>,
}
