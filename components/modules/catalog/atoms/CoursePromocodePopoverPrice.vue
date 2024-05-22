<template>
  <div
    :class="`course-promocode-popover-price ${yellow ? 'course-promocode-popover-price--yellow' : ''} ${big ? 'course-promocode-popover-price--big' : ''}`"
  >
    <div class="course-promocode-popover-price__name">
      <slot />
    </div>
    <div class="course-promocode-popover-price__value">
      <slot name="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  yellow: {
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
@import "@/assets/scss/components/modules/catalog/atoms/coursePromocodePopoverPrice";
</style>
