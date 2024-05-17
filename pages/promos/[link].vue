<template>
  <Promo />
</template>

<script lang="ts" setup>
import Promo from '@/components/modules/promo/Index.vue';

definePageMeta({
  middleware: [
    'promo',
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
