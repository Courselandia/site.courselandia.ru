<template>
  <span
    :class="`icon ${nameClass}`"
    :style="{ width: `${size[0]}px`, height: `${size[1]}px` }"
    :title="title"
  />
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
} from 'vue';

import type TColor from '@/types/color';
import type TIcon from '@/types/icon';
import type TIconSize from '@/types/iconSize';

const props = defineProps({
  name: {
    type: String as PropType<TIcon>,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
  color: {
    type: String as PropType<TColor>,
    default: null,
  },
  colorHover: {
    type: String as PropType<TColor>,
    default: null,
  },
  size: {
    type: [Array, String, Number] as PropType<TIconSize>,
    default: () => [20, 20],
  },
});

const nameClass = computed(() => {
  const classes = [];
  classes.push(`icon--name-${props.name}`);

  if (props.color) {
    classes.push(`icon--color-${props.color}`);
  }

  if (props.colorHover) {
    classes.push(`icon--color-hover-${props.colorHover}`);
  }

  if (props.size) {
    classes.push(`icon--size-${props.size}`);
  }

  return classes.join(' ');
});

const size = computed(() => {
  if (typeof props.size === 'string' || typeof props.size === 'number') {
    return [props.size, props.size];
  }

  return props.size;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/icon.scss";
</style>
