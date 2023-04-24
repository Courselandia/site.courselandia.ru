<template>
  <div class="range-slider">
    <div
      v-if="showValues"
      class="range-slider__values"
    >
      <template v-if="typeof input === 'object'">
        <template v-if="money">
          {{ toMoney(input[0]) }} {{ getLabel(input[0]) }}
          –
          {{ toMoney(input[1]) }} {{ getLabel(input[1]) }}
        </template>
      </template>
      <template v-else>
        {{ money ? toMoney(input) : input }} ₽
      </template>
    </div>
    <div class="range-slider__slider">
      <Slider
        v-model="input"
        show-tooltip="drag"
        :min="min"
        :max="max"
        :step="step"
        :format="format"
        :disabled="disabled"
        @change="onChange"
      />
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
    type: [Number, Array<Number>],
    required: true,
  },
  min: {
    type: Number,
    required: false,
    default: 0,
  },
  max: {
    type: Number,
    required: false,
    default: 0,
  },
  step: {
    type: Number,
    required: false,
    default: 1,
  },
  money: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: Function,
    required: false,
    default: () => {},
  },
  showValues: {
    type: Boolean,
    required: false,
    default: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const {
  value,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: Number | Array<Number>) => true,
  change: (_: Number | Array<Number>) => true,
});

const input = ref(value.value);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const toMoney = (val: number): string => money(val);

const getLabel = (val: number): string => props.label(val);

const format = (val: number): string => {
  if (props.money) {
    return `${toMoney(val)} ${getLabel(val)}`;
  }

  return String(Math.round(val));
};

const onChange = (): void => {
  emit('change', input.value);
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/rangeSlider.scss";
</style>

<style lang="css">
@import "@vueform/slider/themes/default.css";
</style>
