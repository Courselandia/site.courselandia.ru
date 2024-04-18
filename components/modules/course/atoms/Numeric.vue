<template>
  <div class="numeric">
    <div class="numeric__number">
      {{ number }}
    </div>
    <div class="numeric__text">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  number: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/numeric";
</style>
