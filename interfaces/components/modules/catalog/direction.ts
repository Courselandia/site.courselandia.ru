import type TId from '@/types/id';

export default interface IDirection {
  id?: TId,
  name?: string,
  link?: string,
  disabled?: boolean,
}
