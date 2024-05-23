<template>
  <div class="course-promocode-popover-code-info-action">
    <div class="course-promocode-popover-code-info-action__button">
      <Button
        wide
      >
        Показать промокод
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';

defineProps({
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/promocodePopoverCodeInfoAction";
</style>
