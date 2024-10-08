// eslint-disable-next-line import/no-cycle
import type IDirectionLink from '@/interfaces/stores/course/directionLink';
import type IProfessionLink from '@/interfaces/stores/course/professionLink';
import type IMetatag from '@/interfaces/stores/metatag/metatag';
import type TId from '@/types/id';

export default interface ICategoryLink {
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
  directions: Array<IDirectionLink>,
  professions: Array<IProfessionLink>,
}
