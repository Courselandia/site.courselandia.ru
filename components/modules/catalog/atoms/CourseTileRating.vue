<template>
  <div class="course-tile-rating">
    <div class="course-tile-rating__star">
      <Icon
        name="star"
        color="blue2"
        :size="[16, 16]"
      />
    </div>
    <div class="course-tile-rating__amount">
      {{ rating }}
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
@import "@/assets/scss/components/modules/catalog/atoms/courseTileRating";
</style>
