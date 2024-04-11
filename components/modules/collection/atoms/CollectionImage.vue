<template>
  <LazyImage
    :src="path ? path : holder?.default"
    class="collection-image"
    :alt="name"
    :title="name"
  />
</template>

<script lang="ts" setup>
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  path: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
});

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collection/atoms/collectionImage";
</style>
