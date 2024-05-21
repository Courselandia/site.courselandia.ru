<template>
  <div class="promocode-logo">
    <LazyImage
      v-if="image"
      :src="image"
      :alt="label"
      :title="label"
      class="promocode-logo__image"
    />
    <div
      v-else
      class="promocode-logo__label"
    >
      {{ label }}
    </div>
  </div>
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
@import "@/assets/scss/components/modules/promos/atoms/promocodeLogo";
</style>