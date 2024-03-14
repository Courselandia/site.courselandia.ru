<template>
  <div>
    <div class="statistic__row">
      <div class="statistic__amount">
        5
      </div>
      <div class="statistic__item">
        <template
          v-if="count5"
        >
          <div
            v-if="ratingValue === 5 || !ratingValue"
            :class="`statistic__bar statistic__bar--full ${count5 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count5) + 'px' }"
            :title="`Отзывов: ${count5}`"
            @click="onClickFilter(5, count5)"
            @keyup="onClickFilter(5, count5)"
          />
          <div
            v-else
            :class="`statistic__bar statistic__bar--empty ${count2 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count5) + 'px' }"
            :title="`Отзывов: ${count5}`"
            @click="onClickFilter(5, count5)"
            @keyup="onClickFilter(5, count5)"
          />
        </template>
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
        <template
          v-if="count4"
        >
          <div
            v-if="ratingValue === 4 || !ratingValue"
            :class="`statistic__bar statistic__bar--full ${count4 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count4) + 'px' }"
            :title="`Отзывов: ${count4}`"
            @click="onClickFilter(4, count4)"
            @keyup="onClickFilter(4, count4)"
          />
          <div
            v-else
            :class="`statistic__bar statistic__bar--empty ${count4 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count4) + 'px' }"
            :title="`Отзывов: ${count4}`"
            @click="onClickFilter(4, count4)"
            @keyup="onClickFilter(4, count4)"
          />
        </template>
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
        <template
          v-if="count3"
        >
          <div
            v-if="ratingValue === 3 || !ratingValue"
            :class="`statistic__bar statistic__bar--full ${count3 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count3) + 'px' }"
            :title="`Отзывов: ${count3}`"
            @click="onClickFilter(3, count3)"
            @keyup="onClickFilter(3, count3)"
          />
          <div
            v-else
            :class="`statistic__bar statistic__bar--empty ${count3 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count3) + 'px' }"
            :title="`Отзывов: ${count3}`"
            @click="onClickFilter(3, count3)"
            @keyup="onClickFilter(3, count3)"
          />
        </template>
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
        <template
          v-if="count2"
        >
          <div
            v-if="ratingValue === 2 || !ratingValue"
            :class="`statistic__bar statistic__bar--full ${count2 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count2) + 'px' }"
            :title="`Отзывов: ${count2}`"
            @click="onClickFilter(2, count2)"
            @keyup="onClickFilter(2, count2)"
          />
          <div
            v-else
            :class="`statistic__bar statistic__bar--empty ${count2 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count2) + 'px' }"
            :title="`Отзывов: ${count2}`"
            @click="onClickFilter(2, count2)"
            @keyup="onClickFilter(2, count2)"
          />
        </template>
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
        <template
          v-if="count1"
        >
          <div
            v-if="ratingValue === 1 || !ratingValue"
            :class="`statistic__bar statistic__bar--full ${count1 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count1) + 'px' }"
            :title="`Отзывов: ${count1}`"
            @click="onClickFilter(1, count1)"
            @keyup="onClickFilter(1, count1)"
          />
          <div
            v-else
            :class="`statistic__bar statistic__bar--empty ${count1 ? 'statistic__bar--cursor' : ''}`"
            :style="{ width: getWidthStatsBar(count, count1) + 'px' }"
            :title="`Отзывов: ${count1}`"
            @click="onClickFilter(1, count1)"
            @keyup="onClickFilter(1, count1)"
          />
        </template>
      </div>
      <div class="statistic__cancel">
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

const onClickFilter = (rtg: number, cnt: number): void => {
  if (cnt) {
    if (rtg !== ratingValue.value) {
      ratingValue.value = rtg;
    } else {
      ratingValue.value = null;
    }
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
