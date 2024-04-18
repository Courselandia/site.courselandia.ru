<template>
  <div class="amount-courses">
    <Icon
      name="video"
      :size="[24, 24]"
      color="black"
      class="amount-courses__icon"
    />
    <div class="amount-courses__label">
      Курсов: <b>{{ count }}</b>
    </div>
  </div>
</template>
<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  count: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/atoms/amountCourses";
</style>
