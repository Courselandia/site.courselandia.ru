<template>
  <div class="list-school-reviews">
    <div
      v-for="(school, key) in schools"
      :key="key"
      class="list-school-reviews__item"
    >
      <nuxt-link
        :to="school.link"
        class="list-school-reviews__link"
        @click="onClick"
      >
        <div class="list-school-reviews__icon">
          <Icon
            name="star"
            color="blue2"
            :size="[16, 16]"
          />
        </div>
        <div class="list-school-reviews__rating">
          {{ school.rating }}
        </div>
        <div class="list-school-reviews__label">
          {{ school.label }} ({{ school.reviews }}
          <template v-if="school.reviews === 0 || school.reviews >= 5">
            отзывов)
          </template>
          <template v-else-if="school.reviews === 1">
            отзыв)
          </template>
          <template v-else-if="school.reviews >= 2 || school.reviews >= 4">
            отзыва)
          </template>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';

const props = defineProps({
  schools: {
    type: Array<IListSchoolReview>,
    required: true,
  },
});

const emit = defineEmits({
  click: () => true,
});

const onClick = (): void => {
  emit('click');
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/listSchoolReviews.scss";
</style>
