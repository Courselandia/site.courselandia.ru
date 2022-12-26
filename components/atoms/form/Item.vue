<template>
  <div class="form-item">
    <div
      v-if="label"
      class="form-item__label"
    >
      {{ label }}
    </div>
    <div class="form-item__label__input">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  required: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/atoms/form/formItem.scss";
</style>
