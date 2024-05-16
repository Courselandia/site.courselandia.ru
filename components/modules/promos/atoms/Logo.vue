<template>
  <a
    :href="site"
    class="logo link"
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    <LazyImage
      v-if="image"
      :src="image"
      :alt="label"
      :title="label"
      class="logo__image"
    />
    <div
      v-else
      class="logo__label"
    >
      {{ label }}
    </div>
  </a>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  image: {
    type: String,
    required: false,
    default: null,
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
@import "@/assets/scss/components/modules/promos/atoms/logo";
</style>
