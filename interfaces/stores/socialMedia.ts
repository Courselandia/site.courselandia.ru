import ESocialMedia from '@/enums/socialMedia';
import type TId from '@/types/id';

export default interface ISocialMedia {
  id: TId;
  name: ESocialMedia;
  value: string;
}
