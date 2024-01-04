import ELevel from '@/enums/stores/course/level';
import type TId from '@/types/id';

export default interface ISalary {
  id: TId,
  profession_id: TId,
  level: ELevel,
  salary: number,
  status: boolean,
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
