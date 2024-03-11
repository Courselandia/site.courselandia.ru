<template>
  <div
    v-if="review"
    class="review"
  >
    <Rate
      :value="review.rating"
      class="review__rate"
    />
    <div
      v-if="review.title"
      class="review__title"
    >
      {{ review.title }}
    </div>
    <div
      v-if="review.review"
      class="review__text"
      v-html="rnToBr(review.review)"
    />
    <template
      v-if="review.advantages"
    >
      <div class="review__sub-title">
        Достоинства
      </div>
      <div
        class="review__text"
        v-html="rnToBr(review.advantages)"
      />
    </template>
    <template
      v-if="review.disadvantages"
    >
      <div class="review__sub-title">
        Недостатки
      </div>
      <div
        class="review__text"
        v-html="rnToBr(review.disadvantages)"
      />
    </template>
    <div
      v-if="review.name || review.created_at || review.source"
      class="review__info"
    >
      <div class="review__avatar">
        <Animal />
      </div>
      <div class="review__name-and-date">
        <div
          v-if="review.name"
          class="review__name"
        >
          {{ review.name }}
        </div>
        <div
          v-if="review.created_at"
          class="review__date"
        >
          {{ dayjs.utc(review.created_at).tz(dayjs.tz.guess()).format('D MMMM YYYY') }}
        </div>
      </div>
      <div
        v-if="review.source"
        class="review__source"
      >
        {{ getDomain(review.source) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import {
  type PropType,
  toRefs,
} from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import Rate from '@/components/atoms/Rate.vue';
import { rnToBr } from '@/helpers/format';
import type IReview from '@/interfaces/stores/review/review';

const props = defineProps({
  review: {
    type: Object as PropType<IReview>,
    required: true,
  },
});

const { review } = toRefs(props);

const getDomain = (url: string): string => {
  const urlObj = new URL(url);

  return urlObj.host;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/review";
</style>
