<template>
  <div
    :class="`numerics numerics--columns-${columns}`"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  columns: {
    type: Number,
    required: false,
    default: 2,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/numerics";
</style>
