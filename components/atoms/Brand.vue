<template>
  <nuxt-link
    :to="url"
    class="brand"
  >
    <LazyImage
      :src="image"
      :alt="label"
      :title="label"
      class="brand__image"
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
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/brand.scss";
</style>
