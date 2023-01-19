<template>
  <button
    :class="`button ${nameClass}`"
    :href="to"
    @click.prevent="onClick"
    @keydown.prevent="onClick"
  >
    <div class="button__label">
      <slot />
    </div>
    <div class="button__icon"><slot name="icon" /></div>
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

import TButton from '@/types/button';

const props = defineProps({
  type: {
    type: String as PropType<TButton>,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: null,
  },
  wide: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const router = useRouter();

const nameClass = computed(() => {
  const classes = [];

  if (props.type === 'primary') {
    classes.push('button--primary');
  }

  if (props.type === 'secondary') {
    classes.push('button--secondary');
  }

  if (props.type === 'tertiary') {
    classes.push('button--tertiary');
  }

  if (props.disabled) {
    classes.push('button--disabled');
  }

  if (props.wide) {
    classes.push('button--wide');
  }

  if (props.icon) {
    classes.push('button--icon');
  }

  return classes.join(' ');
});

const onClick = (): boolean => {
  if (props.disabled === false) {
    if (props.to) {
      router.push(props.to);
    }

    return true;
  }

  return false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/button.scss";
</style>
