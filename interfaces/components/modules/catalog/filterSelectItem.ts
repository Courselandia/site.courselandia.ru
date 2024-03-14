import ELevel from '@/enums/stores/course/level';
import type IImage from '@/interfaces/stores/image/image';
import type TId from '@/types/id';

export default interface IFilterSelectItem {
  id: TId,
  label?: string,
  link?: string,
  value?: ELevel,
  disabled?: boolean,
  image?: IImage | null,
  extra?: string,
}
