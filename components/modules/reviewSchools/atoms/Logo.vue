<template>
  <div class="logo">
    <LazyImage
      v-if="image"
      :src="image"
      :alt="label"
      :title="label"
      class="logo__image"
    />
    <template
      v-else
    >
      {{ label }}
    </template>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/atoms/logo";
</style>
