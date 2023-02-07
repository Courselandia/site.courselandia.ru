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
const props = defineProps({
  number: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/numeric.scss";
</style>
