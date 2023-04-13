<template>
  <nuxt-link
    :to="url"
    class="brand"
  >
    <LazyImage
      :src="image"
      :alt="label"
      :title="label"
      :class="`brand__image ${height === width ? 'brand__image--box' : ''}`"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
import LazyImage from '@/components/atoms/LazyImage.vue';

const props = defineProps({
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
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/brand.scss";
</style>
