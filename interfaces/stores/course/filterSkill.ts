import type TId from '@/types/id';

export default interface IFilterSkill {
  id: TId,
  name: string,
  link: string,
  disabled?: boolean,
}
