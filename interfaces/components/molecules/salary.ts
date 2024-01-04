import ELevel from '@/enums/stores/course/level';
import type TId from '@/types/id';

export default interface ISalary {
  id: TId,
  level: ELevel,
  salary: number,
}
