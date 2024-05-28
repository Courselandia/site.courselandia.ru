<template>
  <div class="promocode-logo">
    <LazyImage
      v-if="image"
      :src="image.path"
      :alt="label"
      :title="label"
      :class="`promocode-logo__image ${image.width === image.height ? 'promocode-logo__image--box' : ''}`"
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
import type { PropType } from 'vue';

import LazyImage from '@/components/atoms/LazyImage.vue';
import type IImage from '@/interfaces/stores/image/image';

defineProps({
  image: {
    type: Object as PropType<IImage>,
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