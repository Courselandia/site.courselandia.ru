<template>
  <div>
    <div class="statistic">
      <div class="statistic__amount">
        5
      </div>
      <div class="statistic__item">
        <div
          v-if="ratingValue === 5 || !ratingValue"
          class="statistic__bar statistic__bar--full"
          :style="{ width: getWidthStatsBar(count, count5) + 'px' }"
          :title="`Отзывов: ${count5}`"
          @click="onClickFilter(5)"
          @keyup="onClickFilter(5)"
        />
        <div
          v-else
          class="statistic__bar statistic__bar--empty"
          :style="{ width: getWidthStatsBar(count, count5) + 'px' }"
          :title="`Отзывов: ${count5}`"
          @click="onClickFilter(5)"
          @keyup="onClickFilter(5)"
        />
      </div>
      <div class="statistic__cancel">
        <Icon
          v-if="ratingValue === 5"
          name="close"
          color="black"
          :size="[16, 16]"
          class="statistic__icon"
          @click="onClickCancelFilter"
        />
      </div>
    </div>
    <div class="statistic__row">
      <div class="statistic__amount">
        4
      </div>
      <div class="statistic__item">
        <div
          v-if="ratingValue === 4 || !ratingValue"
          class="statistic__bar statistic__bar--full"
          :style="{ width: getWidthStatsBar(count, count4) + 'px' }"
          :title="`Отзывов: ${count4}`"
          @click="onClickFilter(4)"
          @keyup="onClickFilter(4)"
        />
        <div
          v-else
          class="statistic__bar statistic__bar--empty"
          :style="{ width: getWidthStatsBar(count, count4) + 'px' }"
          :title="`Отзывов: ${count4}`"
          @click="onClickFilter(4)"
          @keyup="onClickFilter(4)"
        />
      </div>
      <div class="statistic__cancel">
        <Icon
          v-if="ratingValue === 4"
          name="close"
          color="black"
          :size="[16, 16]"
          class="statistic__icon"
          @click="onClickCancelFilter"
        />
      </div>
    </div>
    <div class="statistic__row">
      <div class="statistic__amount">
        3
      </div>
      <div class="statistic__item">
        <div
          v-if="ratingValue === 3 || !ratingValue"
          class="statistic__bar statistic__bar--full"
          :style="{ width: getWidthStatsBar(count, count3) + 'px' }"
          :title="`Отзывов: ${count3}`"
          @click="onClickFilter(3)"
          @keyup="onClickFilter(3)"
        />
        <div
          v-else
          class="statistic__bar statistic__bar--empty"
          :style="{ width: getWidthStatsBar(count, count3) + 'px' }"
          :title="`Отзывов: ${count3}`"
          @click="onClickFilter(3)"
          @keyup="onClickFilter(3)"
        />
      </div>
      <div class="statistic__cancel">
        <Icon
          v-if="ratingValue === 3"
          name="close"
          color="black"
          :size="[16, 16]"
          class="statistic__icon"
          @click="onClickCancelFilter"
        />
      </div>
    </div>
    <div class="statistic__row">
      <div class="statistic__amount">
        2
      </div>
      <div class="statistic__item">
        <div
          v-if="ratingValue === 2 || !ratingValue"
          class="statistic__bar statistic__bar--full"
          :style="{ width: getWidthStatsBar(count, count2) + 'px' }"
          :title="`Отзывов: ${count2}`"
          @click="onClickFilter(2)"
          @keyup="onClickFilter(2)"
        />
        <div
          v-else
          class="statistic__bar statistic__bar--empty"
          :style="{ width: getWidthStatsBar(count, count2) + 'px' }"
          :title="`Отзывов: ${count2}`"
          @click="onClickFilter(2)"
          @keyup="onClickFilter(2)"
        />
      </div>
      <div class="statistic__cancel">
        <Icon
          v-if="ratingValue === 2"
          name="close"
          color="black"
          :size="[16, 16]"
          class="statistic__icon"
          @click="onClickCancelFilter"
        />
      </div>
    </div>
    <div class="statistic__row">
      <div class="statistic__amount">
        1
      </div>
      <div class="statistic__item">
        <div
          v-if="ratingValue === 1 || !ratingValue"
          class="statistic__bar statistic__bar--full"
          :style="{ width: getWidthStatsBar(count, count1) + 'px' }"
          :title="`Отзывов: ${count1}`"
          @click="onClickFilter(1)"
          @keyup="onClickFilter(1)"
        />
        <div
          v-else
          class="statistic__bar statistic__bar--empty"
          :style="{ width: getWidthStatsBar(count, count1) + 'px' }"
          :title="`Отзывов: ${count1}`"
          @click="onClickFilter(1)"
          @keyup="onClickFilter(1)"
        />
      </div>
      <div
        class="statistic__cancel"
      >
        <Icon
          v-if="ratingValue === 1"
          name="close"
          color="black"
          :size="[16, 16]"
          class="statistic__icon"
          @click="onClickCancelFilter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  rating: {
    type: Number,
    required: false,
    default: null,
  },
  count: {
    type: Number,
    required: true,
  },
  count5: {
    type: Number,
    required: true,
  },
  count4: {
    type: Number,
    required: true,
  },
  count3: {
    type: Number,
    required: true,
  },
  count2: {
    type: Number,
    required: true,
  },
  count1: {
    type: Number,
    required: true,
  },
});

const {
  rating,
} = toRefs(props);

const emit = defineEmits({
  'update:rating': (_: number | null) => true,
});

const ratingValue = ref<number | null>(rating.value);

watch(ratingValue, () => {
  emit('update:rating', ratingValue.value);
});

watch(rating, () => {
  ratingValue.value = rating.value;
});

const onClickFilter = (rtg: number): void => {
  if (rtg !== ratingValue.value) {
    ratingValue.value = rtg;
  } else {
    ratingValue.value = null;
  }
};

const onClickCancelFilter = (): void => {
  ratingValue.value = null;
};

const getWidthStatsBar = (
  total: number,
  forParticularStars: number,
): number => Math.round((forParticularStars * 100) / total);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/statistic";
</style>
