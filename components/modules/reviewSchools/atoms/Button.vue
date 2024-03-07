<template>
  <Button
    :to="`/reviews/${link}`"
  >
    {{ reviews }}
    <template v-if="reviews === 0 || reviews >= 5">
      отзывов
    </template>
    <template v-else-if="reviews === 1">
      отзыв
    </template>
    <template v-else-if="reviews >= 2 || reviews >= 4">
      отзыва
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
});
</script>
