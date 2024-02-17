import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type TId from '@/types/id';

export default interface IToolLink {
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
}
