import TIcon from '@/types/icon';
import TLabel from '@/types/label';
import TValue from '@/types/value';

export default interface IOption {
  value: TValue | null,
  label: TLabel,
  icon?: TIcon
  display?: Boolean,
}
