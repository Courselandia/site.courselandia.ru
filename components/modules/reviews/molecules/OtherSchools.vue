<template>
  <div
    v-if="otherSchools?.length"
    class="other-schools"
  >
    <div class="other-schools__label">
      Отзывы о других школах
    </div>
    <div class="other-schools__items">
      <div
        v-for="(otherSchool, index) in otherSchools"
        :key="index"
        class="other-schools__item"
      >
        <div class="other-schools__rating">
          {{ Math.round(otherSchool.rating * 100) / 100 }}
        </div>
        <div class="other-schools__icon">
          <Icon
            name="star"
            :size="[22, 22]"
            color="blue2"
          />
        </div>
        <div class="other-schools__name">
          {{ otherSchool.name }}
        </div>
        <div class="other-schools__reviews">
          <nuxt-link
            :to="`/reviews/${otherSchool.link}`"
            class="link link--no-line"
            prefetch
          >
            {{ otherSchool.amount_reviews }}
            {{ plural(otherSchool.amount_reviews, conditions) }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  type PropType,
  ref,
  toRefs,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import plural from '@/helpers/plural';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type ISchool from '@/interfaces/stores/school/school';
import schoolStore from '@/stores/school';

const props = defineProps({
  school: {
    type: Object as PropType<ISchoolLink>,
    required: true,
  },
});

const { school } = toRefs(props);

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};

const sortSchools = (items: Array<ISchool> | null): Array<ISchool> | null => {
  if (items) {
    return items.sort((first: ISchool, second: ISchool) => {
      if (first.rating > second.rating) {
        return -1;
      }

      if (first.rating < second.rating) {
        return 1;
      }

      return 0;
    });
  }

  return null;
};

const { schools } = storeToRefs(schoolStore());

const otherSchools = ref<Array<ISchool> | null>(
  sortSchools(
    schools.value?.filter(
      (item: ISchool) => !!item.amount_reviews && school.value.id !== item.id,
    ) || null,
  )?.slice(0, 4) || null,
);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/otherSchools";
</style>
