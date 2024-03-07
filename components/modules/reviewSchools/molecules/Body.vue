<template>
  <div class="body">
    <template
      v-for="(itm, key) in listSchools"
    >
      <School
        v-if="itm.reviews"
        :key="key"
        :school="itm"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  computed,
  type PropType,
  toRefs,
} from 'vue';

import School from '@/components/modules/reviewSchools/molecules/School.vue';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
import EDirection from '@/enums/direction';
import type IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import type ISort from '@/interfaces/sort';
import school from '@/stores/school';

const props = defineProps({
  direction: {
    type: Number as PropType<EDirection>,
    required: false,
    default: null,
  },
  sort: {
    type: Object as PropType<ISort>,
    required: false,
    default: null,
  },
});

const {
  direction,
  sort,
} = toRefs(props);

const { schools } = storeToRefs(school());

const listSchools = computed<IListSchoolReview[] | null>(() => {
  if (!schools.value) {
    return null;
  }

  let items = schoolsToSchoolReviews(schools.value);
  items = items.sort((first: IListSchoolReview, second: IListSchoolReview) => {
    if (sort.value?.sortBy === 'label') {
      if (sort.value?.sortOrder === 'ASC') {
        if (first.label < second.label) {
          return -1;
        }

        if (first.label > second.label) {
          return 1;
        }
      } else {
        if (first.label > second.label) {
          return -1;
        }

        if (first.label < second.label) {
          return 1;
        }
      }
    }

    if (sort.value?.sortBy === 'rating') {
      if (sort.value?.sortOrder === 'ASC') {
        if (first.rating < second.rating) {
          return -1;
        }

        if (first.rating > second.rating) {
          return 1;
        }
      } else {
        if (first.rating > second.rating) {
          return -1;
        }

        if (first.rating < second.rating) {
          return 1;
        }
      }
    }

    return 0;
  });

  if (direction.value) {
    items = items.filter((sch: IListSchoolReview) => {
      if (direction.value === EDirection.PROGRAMMING) {
        return !!sch.amount_courses.direction_programming;
      }

      if (direction.value === EDirection.MARKETING) {
        return !!sch.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.DESIGN) {
        return !!sch.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.BUSINESS) {
        return !!sch.amount_courses.direction_business;
      }

      if (direction.value === EDirection.ANALYTICS) {
        return !!sch.amount_courses.direction_analytics;
      }

      if (direction.value === EDirection.GAMES) {
        return !!sch.amount_courses.direction_games;
      }

      if (direction.value === EDirection.OTHER) {
        return !!sch.amount_courses.direction_other;
      }

      return false;
    });
  }

  return items;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/molecules/body";
</style>
