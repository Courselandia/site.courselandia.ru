<template>
  <div class="salary-duration">
    <template v-if="months">
      за {{ months }}
      <template v-if="months === 1">
        месяц
      </template>
      <template v-else-if="months >= 2 && months <= 4">
        месяца
      </template>
      <template v-else-if="months >= 5">
        месяцев
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  months: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/salaryDuration";
</style>
