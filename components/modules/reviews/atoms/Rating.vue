<template>
  <div class="rating">
    <div class="rating__number">
      {{ Math.round(rating * 100) / 100 }}
    </div>
    <Icon
      class="rating__icon"
      name="star"
      :size="[32, 32]"
      color="blue2"
    />
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  rating: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/atoms/rating";
</style>
