<template>
  <div class="promo-description">
    {{ description }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  description: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promoDescription";
</style>
