<template>
  <div class="course-tile-lessons-amount">
    {{ amount }}
    <template v-if="amount === 1">
      урок
    </template>
    <template v-else-if="amount >= 2 && amount <= 4">
      урока
    </template>
    <template v-else-if="amount >= 5">
      уроков
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileLessonsAmount";
</style>
