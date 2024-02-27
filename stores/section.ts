import { defineStore } from 'pinia';

import type ISectionLink from '@/interfaces/stores/course/sectionLink';

export default defineStore('section', {
  state: () => ({
    itemLinkSection: null as ISectionLink | null,
  }),
});
