import ELevel from '@/enums/components/modules/catalog/level';

export default interface ILevel {
  label?: string,
  value: ELevel,
  disabled?: boolean,
}
