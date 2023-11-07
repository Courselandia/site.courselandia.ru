import { Dayjs } from 'dayjs';

import TId from '@/types/id';

export default interface ITeacherExperience {
  id?: TId;
  place?: string | undefined;
  position?: string | undefined;
  started?: Dayjs | string | undefined;
  finished?: Dayjs | string | undefined;
  weight?: number | string | undefined;
}
