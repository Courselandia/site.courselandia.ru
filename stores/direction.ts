import { defineStore } from 'pinia';

import type IDirection from '@/interfaces/stores/course/direction';
import type IDirectionLink from '@/interfaces/stores/course/directionLink';

export default defineStore('direction', {
  state: () => ({
    directions: null as IDirection[] | null,
    itemLinkDirection: null as IDirectionLink | null,
  }),
});
