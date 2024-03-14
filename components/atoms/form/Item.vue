<template>
  <div
    :class="`form-item ${nameClass}`"
  >
    <div
      v-if="label"
      class="form-item__label"
    >
      {{ label }}
    </div>
    <div class="form-item__input">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: null,
  },
  required: {
    type: Boolean,
    default: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.horizontal) {
    classes.push('form-item--horizontal');
  }

  return classes.join(' ');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/form/formItem";
</style>
