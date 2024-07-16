<template>
  <div class="image">
    <LazyImage
      :src="path"
      class="image__element"
      :alt="title"
      :title="title"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: false,
    default: null,
  },
  height: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publication/atoms/image";
</style>
