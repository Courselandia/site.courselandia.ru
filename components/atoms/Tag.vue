<template>
  <template v-if="to">
    <nuxt-link
      :to="to"
      :class="`tag ${nameClass}`"
    >
      <div
        v-if="hasSlot('before')"
        class="tag__before"
      >
        <slot name="before" />
      </div>
      <div class="tag__label">
        <slot />
      </div>
      <div
        v-if="hasSlot('after')"
        class="tag__after"
      >
        <slot name="after" />
      </div>
    </nuxt-link>
  </template>
  <template v-else>
    <div
      :class="`tag ${nameClass}`"
    >
      <div
        v-if="hasSlot('before')"
        class="tag__before"
      >
        <slot name="before" />
      </div>
      <div class="tag__label">
        <slot />
      </div>
      <div
        v-if="hasSlot('after')"
        class="tag__after"
      >
        <slot name="after" />
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  useSlots,
} from 'vue';

import type TColor from '@/types/color';

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
  colorHover: {
    type: String as PropType<TColor>,
    required: false,
    default: null,
  },
  shadow: {
    type: Boolean,
    required: false,
    default: false,
  },
  cursor: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
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

  if (props.borderHover && !props.disabled) {
    classes.push(`tag--border-hover-${props.borderHover}`);
  }

  if (props.bck) {
    classes.push(`tag--bck-${props.bck}`);
  }

  if (props.color) {
    classes.push(`tag--color-${props.color}`);
  }

  if (props.colorHover && !props.disabled) {
    classes.push(`tag--color-hover-${props.colorHover}`);
  }

  if (props.bckHover && !props.disabled) {
    classes.push(`tag--bck-hover-${props.bckHover}`);
  }

  if (props.shadow) {
    classes.push('tag--shadow');
  }

  if (props.disabled) {
    classes.push('tag--disabled');
  }

  if (!props.disabled && (props.to || props.cursor)) {
    classes.push('tag--cursor');
  }

  return classes.join(' ');
});

const slots = useSlots();

const hasSlot = (name: string) => !!slots[name];
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/tag.scss";
</style>
