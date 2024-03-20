<template>
  <div class="image">
    <LazyImage
      v-if="path"
      :src="path"
      class="image__element"
      :alt="title"
      :title="title"
    />
    <LazyImage
      v-else-if="holder.default"
      :src="holder.default"
      class="image__element"
    />
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

const props = defineProps({
  path: {
    type: String,
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
});

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/atoms/image";
</style>
