import type TId from '@/types/id';

export default interface IProgram {
  id: TId,
  name: string,
  text: string,
  children?: Array<IProgram>,
}
