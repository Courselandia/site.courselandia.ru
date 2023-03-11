import TId from '@/types/id';

export default interface IProperty {
  id: TId,
  name: string,
  link?: string,
  disabled?: null,
}
