<template>
  <div class="collection-image">
    <LazyImage
      :src="pathBox ? pathBox : holder?.default"
      class="collection-image__desktop"
      :alt="name"
      :title="name"
    />
    <LazyImage
      :src="pathHorizontal ? pathHorizontal : holder?.default"
      class="collection-image__mobile"
      :alt="name"
      :title="name"
    />
  </div>
</template>

<script lang="ts" setup>
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  pathBox: {
    type: String,
    required: false,
    default: null,
  },
  pathHorizontal: {
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
