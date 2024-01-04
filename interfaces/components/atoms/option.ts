import type TIcon from '@/types/icon';
import type TLabel from '@/types/label';
import type TValue from '@/types/value';

export default interface IOption {
  value: TValue | null,
  label: TLabel,
  icon?: TIcon
  display?: Boolean,
}
