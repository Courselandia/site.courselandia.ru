<template>
  <div class="course-tile-brand-logo">
    <LazyImage
      :src="path"
      class="course-tile-brand-logo__image"
      :alt="name"
      :title="name"
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
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileBrandLogo";
</style>
