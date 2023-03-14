import IMetatag from '@/interfaces/stores/metatag/metatag';
import TId from '@/types/id';

export default interface ISkillLink {
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
}
