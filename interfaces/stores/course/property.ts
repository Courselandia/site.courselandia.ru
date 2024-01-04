import type ITeacherExperience from '@/interfaces/stores/course/teacherExperience';
import type IImage from '@/interfaces/stores/image/image';
import type TId from '@/types/id';

export default interface IProperty {
  id: TId,
  name: string,
  link?: string,
  disabled?: null,
  image_middle_id?: IImage | null,
  experiences?: ITeacherExperience[],
}
