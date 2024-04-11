<template>
  <div class="card-brand-logo">
    <LazyImage
      `:src="path"
      class="card-brand-logo__image"
      :alt="name"
      :title="name"`
    />
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

const props = defineProps({
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
@import "@/assets/scss/components/modules/course/atoms/cardBrandLogo";
</style>
