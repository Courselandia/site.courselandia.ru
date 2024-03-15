<template>
  <div
    class="anons"
    v-html="rnToBr(anons)"
  />
</template>

<script setup lang="ts">
import { rnToBr } from '@/helpers/format';

const props = defineProps({
  anons: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/atoms/anons";
</style>
