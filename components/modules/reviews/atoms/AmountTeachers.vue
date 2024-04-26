<template>
  <div class="amount-teachers">
    <Icon
      name="hat"
      :size="[24, 24]"
      color="black"
      class="amount-teachers__icon"
    />
    <div class="amount-teachers__label">
      Преподователей: <b>{{ count }}</b>
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
@import "@/assets/scss/components/modules/reviews/atoms/amountTeachers";
</style>
