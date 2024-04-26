<template>
  <nuxt-link
    :to="url"
    class="brand"
    prefetch
  >
    <LazyImage
      :src="image"
      :alt="label"
      :title="label"
      :class="`brand__image ${height === width ? 'brand__image--box' : ''}`"
      :width="width"
      :height="height"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
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
@import "@/assets/scss/components/modules/home/atoms/brand";
</style>
