import ELevel from '@/enums/stores/course/level';
import type ISectionItemLink from '@/interfaces/stores/course/sectionItem';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type TId from '@/types/id';

export default interface ISectionLink {
  id: TId;
  name: string,
  header: string,
  text: string | null,
  additional: string | null,
  level: ELevel,
  free: boolean,
  metatag: IMetatag | null,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string | null,
  items: Array<ISectionItemLink>,
}
