<template>
  <ClientOnly>
    <div
      :class="`animal ${nameClass}`"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: false,
    default: () => Math.ceil(Math.random() * (12 - 1) + 1),
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.value) {
    classes.push(`animal--${props.value}`);
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/animal";
</style>
