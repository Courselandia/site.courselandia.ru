<template>
  <div class="rating">
    <div class="rating__value">
      {{ Math.round(rating * 100) / 100 }}
    </div>
    <div class="rating__star">
      <Icon
        name="star"
        color="blue2"
        :size="[30, 30]"
        class="rating__icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/atoms/rating";
</style>
