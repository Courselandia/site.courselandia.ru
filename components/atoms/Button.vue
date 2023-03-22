<template>
  <template v-if="link === 'nuxt-link'">
    <nuxt-link
      :class="`button ${nameClass}`"
      :to="to"
      :disabled="disabled"
    >
      <div class="button__label">
        <slot />
      </div>
      <template v-if="hasSlot('icon')">
        <div class="button__icon">
          <slot name="icon" />
        </div>
      </template>
    </nuxt-link>
  </template>
  <template v-else-if="link === 'link'">
    <a
      :class="`button ${nameClass}`"
      :href="to"
      :disabled="disabled"
      :target="target"
      :rel="rel"
    >
      <div class="button__label">
        <slot />
      </div>
      <template v-if="hasSlot('icon')">
        <div class="button__icon">
          <slot name="icon" />
        </div>
      </template>
    </a>
  </template>
  <template v-else-if="link === 'button'">
    <button
      :class="`button ${nameClass}`"
      :disabled="disabled"
      @click.prevent="onClick"
      @keydown.prevent="onClick"
    >
      <div class="button__label">
        <slot />
      </div>
      <template v-if="hasSlot('icon')">
        <div class="button__icon">
          <slot name="icon" />
        </div>
      </template>
    </button>
  </template>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  useSlots,
} from 'vue';
import { useRouter } from 'vue-router';

import TButton from '@/types/button';
import TLink from '@/types/link';

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
  target: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: String as PropType<TLink>,
    required: false,
    default: 'button',
  },
  rel: {
    type: String,
    required: false,
    default: null,
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

const slots = useSlots();

const hasSlot = (name: string) => !!slots[name];

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
