<template>
  <div class="total">
    <template v-if="total === 1">
      Найден
    </template>
    <template v-if="total >= 2">
      Найдено
    </template>
    {{ total }}
    <template v-if="total === 1">
      курс
    </template>
    <template v-if="total >= 2 && total <= 4">
      курса
    </template>
    <template v-else>
      курсов
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/total";
</style>
