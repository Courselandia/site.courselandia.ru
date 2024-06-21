<template>
  <div
    v-if="filteredSchools?.length"
    class="promo-body"
  >
    <div class="promo-body__content">
      <div class="promo-body__schools">
        <School
          v-for="(school, key) in filteredSchools"
          :key="key"
          :school="school"
        />
      </div>
    </div>
    <div
      :class="`promo-body__track ${scroll ? 'promo-body__track--scroll' : ''}`"
    >
      <div
        id="promo-stats"
        :class="`promo-body__stats ${scroll ? 'promo-body__stats--scroll' : ''}`"
      >
        <Stats
          :schools="filteredSchools"
        />
      </div>
    </div>
    <ClientOnly>
      <teleport to="#promos-stats">
        <Stats
          :schools="filteredSchools"
        />
      </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import { apiReadPromos } from '@/api/promo';
import School from '@/components/modules/promos/molecules/School.vue';
import Stats from '@/components/modules/promos/molecules/Stats.vue';
import EDirection from '@/enums/direction';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  direction: {
    type: [String, Number] as PropType<EDirection>,
    required: false,
    default: null,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: true,
  },
});

let schools: Array<ISchool> | undefined = [];
const filteredSchools = ref<Array<ISchool>>();

const {
  direction,
} = toRefs(props);

const filterByDirection = (
  items: Array<ISchool> | undefined,
  dir: EDirection | null,
): Array<ISchool> | undefined => {
  const result = items?.sort((first: ISchool, second: ISchool) => {
    if (first.name < second.name) {
      return -1;
    }

    if (first.name > second.name) {
      return 1;
    }

    return 0;
  });

  if (result && dir) {
    return result.filter((itm: ISchool) => {
      if (dir === EDirection.PROGRAMMING) {
        return !!itm.amount_courses.direction_programming;
      }

      if (dir === EDirection.MARKETING) {
        return !!itm.amount_courses.direction_marketing;
      }

      if (dir === EDirection.DESIGN) {
        return !!itm.amount_courses.direction_marketing;
      }

      if (dir === EDirection.BUSINESS) {
        return !!itm.amount_courses.direction_business;
      }

      if (dir === EDirection.ANALYTICS) {
        return !!itm.amount_courses.direction_analytics;
      }

      if (dir === EDirection.GAMES) {
        return !!itm.amount_courses.direction_games;
      }

      if (dir === EDirection.OTHER) {
        return !!itm.amount_courses.direction_other;
      }

      return false;
    });
  }

  return result;
};

schools = await apiReadPromos(true);
filteredSchools.value = filterByDirection(schools, direction.value);

watch(direction, () => {
  filteredSchools.value = filterByDirection(schools, direction.value);
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/molecules/promoBody";
</style>
