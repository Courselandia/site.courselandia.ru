<template>
  <LazyImage
    v-if="path"
    :src="path"
    :alt="name"
    :title="name"
    class="logo"
  />
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
@import "assets/scss/components/modules/reviews/atoms/logo";
</style>
