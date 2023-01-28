<template>
  <template v-if="to">
    <nuxt-link
      :to="to"
      :class="`tag ${nameClass}`"
    >
      <slot />
    </nuxt-link>
  </template>
  <template v-else>
    <div
      :class="`tag ${nameClass}`"
    >
      <slot />
    </div>
  </template>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
} from 'vue';

import TColor from '@/types/color';

const props = defineProps({
  to: {
    type: String,
    required: false,
    default: null,
  },
  border: {
    type: String as PropType<TColor>,
    required: false,
    default: null,
  },
  borderHover: {
    type: String as PropType<TColor>,
    required: false,
    default: null,
  },
  bck: {
    type: String as PropType<TColor>,
    required: false,
    default: null,
  },
  bckHover: {
    type: String as PropType<TColor>,
    required: false,
    default: null,
  },
  color: {
    type: String as PropType<TColor>,
    required: false,
    default: 'blue2',
  },
  shadow: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.border) {
    classes.push(`tag--border-${props.border}`);
  }

  if (props.borderHover) {
    classes.push(`tag--border-hover-${props.borderHover}`);
  }

  if (props.bck) {
    classes.push(`tag--bck-${props.bck}`);
  }

  if (props.color) {
    classes.push(`tag--color-${props.color}`);
  }

  if (props.bckHover) {
    classes.push(`tag--bck-hover-${props.bckHover}`);
  }

  if (props.shadow) {
    classes.push('tag--shadow');
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/tag.scss";
</style>
