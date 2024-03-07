<template>
  <nuxt-link
    :class="`logo ${nameClass}`"
    to="/"
    alt="courselandia.ru"
    title="courselandia.ru"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  light: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.light) {
    classes.push('logo--light');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/logo.scss";
</style>
