<template>
  <div class="list">
    <Review
      v-for="(review, index) in reviews"
      :key="index"
      :review="review"
    />
  </div>
</template>

<script setup lang="ts">
import Review from '@/components/modules/reviews/molecules/Review.vue';
</script>
