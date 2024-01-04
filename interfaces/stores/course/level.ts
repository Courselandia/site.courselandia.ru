import ELevel from '@/enums/stores/course/level';
import type TId from '@/types/id';

export default interface ILevel {
  id: TId,
  level: ELevel,
}
