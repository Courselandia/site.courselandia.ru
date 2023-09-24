import { defineStore } from 'pinia';

import IDirection from '@/interfaces/stores/course/direction';
import IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    itemLinkDirection: null as IDirectionLink | null,
  }),
});
