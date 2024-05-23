<template>
  <Button
    :to="link"
    type="secondary"
    link="nuxt-link"
    wide
    class="course-promocode-popover-button-go"
  >
    Подробнее о курсе
  </Button>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';

defineProps({
  link: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/coursePromocodePopoverButtonGo";
</style>
