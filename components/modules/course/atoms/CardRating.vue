<template>
  <div class="card-rating">
    <div class="card-rating__star">
      <Icon
        name="star"
        color="blue2"
        :size="[16, 16]"
      />
    </div>
    <div class="card-rating__amount">
      {{ rating }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/cardRating";
</style>
