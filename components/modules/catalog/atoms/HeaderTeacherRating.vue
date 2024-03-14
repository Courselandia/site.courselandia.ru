<template>
  <div class="header-teacher-rating">
    Рейтинг: {{ rating }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherRating";
</style>
