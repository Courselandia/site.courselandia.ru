<template>
  <div
    :class="`card-promocode-price ${blue ? 'card-promocode-price--blue' : ''} ${big ? 'card-promocode-price--big' : ''}`"
  >
    <div class="card-promocode-price__name">
      <slot />
    </div>
    <div class="card-promocode-price__value">
      <slot name="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  blue: {
    type: Boolean,
    required: false,
    default: false,
  },
  big: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardPromocodePrice";
</style>
