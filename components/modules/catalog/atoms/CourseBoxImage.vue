<template>
  <div class="course-box-image">
    <LazyBackground
      :background="path || undefined"
      :holder="holder.default || undefined"
      class="course-box-image__element"
    >
      <slot />
    </LazyBackground>
  </div>
</template>

<script setup lang="ts">
import LazyBackground from '@/components/atoms/LazyBackground.vue';

const holder = await import('assets/images/holder.svg');

defineProps({
  path: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseBoxImage";
</style>
