<template>
  <div class="slider-salary">
    <div class="slider-salary__slider">
      <div class="slider-salary__point slider-salary__point--junior slider-salary__point--active" />
      <div
        :class="`slider-salary__point slider-salary__point--middle ${pointMiddleActive ? 'slider-salary__point--active' : ''}`"
      />
      <div
        :class="`slider-salary__point slider-salary__point--senior ${pointSeniorActive ? 'slider-salary__point--active' : ''}`"
      />
      <Slider
        v-model="percentsValue"
        show-tooltip="always"
        :min="percentsMin"
        :max="percentsMax"
        :step="percentsStep"
        :format="format"
        @slide="onSlide"
      />
    </div>
    <div class="slider-salary__levels">
      <div class="slider-salary__level slider-salary__level--junior">
        <div class="slider-salary__name">
          Junior
        </div>
        <div class="slider-salary__duration">
          Начало работы
        </div>
      </div>
      <div class="slider-salary__level slider-salary__level--middle">
        <div class="slider-salary__name">
          Middle
        </div>
        <div class="slider-salary__duration">
          Опыт 12 месяцев
        </div>
      </div>
      <div class="slider-salary__level slider-salary__level--senior">
        <div class="slider-salary__name">
          Senior
        </div>
        <div class="slider-salary__duration">
          Опыт от 24 месяцев
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Slider from '@vueform/slider';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import { money } from '@/helpers/number';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  junior: {
    type: Number,
    required: false,
    default: 0,
  },
  middle: {
    type: Number,
    required: false,
    default: 0,
  },
  senior: {
    type: Number,
    required: false,
    default: 0,
  },
});

const {
  value,
} = toRefs(props);

const percentsValue = ref(0);
const percentsMin = ref(0);
const percentsMax = ref(100);
const percentsStep = 1;
const pointMiddleActive = ref(false);
const pointSeniorActive = ref(false);

const emit = defineEmits({
  'update:value': (_: Number) => true,
  slide: (_: Number) => true,
});

const salary = (val: number): number => {
  if (val >= 0 && val <= 50) {
    const range = props.middle - props.junior;

    return Math.round(props.junior + (range * ((val * 2) / 100)));
  }

  const range = props.senior - props.middle;

  return Math.round(props.middle + (range * (((val - 50) * 2) / 100)));
};

const input = ref(value.value);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const onSlide = (val: number): void => {
  pointMiddleActive.value = val >= 50;
  pointSeniorActive.value = val === 100;

  input.value = salary(val);

  emit('slide', val);
};

const format = (val: number): string => `${money(salary(val))} ₽`;
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/sliderSalary";
</style>
