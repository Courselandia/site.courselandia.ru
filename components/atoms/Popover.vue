<template>
  <div class="popover">
    <div class="popover__desktop">
      <div
        ref="reference"
        class="popover__action"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onMouseEnter"
        @focusout="onMouseLeave"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  arrow,
  offset,
  useFloating,
} from '@floating-ui/vue';
import { ref } from 'vue';

const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);
const active = ref(false);
const activeClick = ref(false);

const { floatingStyles, middlewareData } = useFloating(
  reference,
  floating,
  {
    middleware: [arrow({ element: floatingArrow }), offset(0)],
    placement: 'top',
  },
);

let timer: number | null = null;

const onMouseEnter = (): void => {
  if (timer) {
    window.clearTimeout(timer);
    timer = null;
  }

  active.value = true;
};

const onMouseLeave = (): void => {
  if (timer) {
    window.clearTimeout(timer);
    timer = null;
  }

  timer = window.setTimeout(() => {
    active.value = false;
  }, 100);
};

const onMouseActiveClick = (): void => {
  activeClick.value = true;
};

const onMouseDeactivateClick = (): void => {
  activeClick.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/popover";
</style>
