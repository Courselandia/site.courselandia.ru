<template>
  <div :class="`loader ${nameClass}`">
    <div class="loader__content">
      <slot />
    </div>
    <div class="loader__item" />
    <div class="loader__scrim" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  toRefs,
} from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: 'small',
  },
  color: {
    type: String,
    required: false,
    default: 'black',
  },
});

const {
  active,
  size,
  color,
} = toRefs(props);

const nameClass = computed(() => {
  const classes = [];

  if (active.value) {
    classes.push('loader--active');
  }

  if (size.value) {
    classes.push(`loader--size-${size.value}`);
  }

  if (color.value) {
    classes.push(`loader--color-${color.value}`);
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/loader.scss";
</style>
