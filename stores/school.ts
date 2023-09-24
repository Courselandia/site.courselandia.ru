import { defineStore } from 'pinia';

import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISchool from '@/interfaces/stores/school/school';

export default defineStore('school', {
  state: () => ({
    schools: null as ISchool[] | null,
    itemLinkSchool: null as ISchoolLink | null,
  }),
});
