<template>
  <div class="program-info">
    <div class="program-info__description">
      {{ description }}
    </div>
    <div
      v-if="modulesAmount"
      class="program-info__modules"
    >
      <div class="program-info__amount">
        {{ modulesAmount }}
      </div>
      <div class="program-info__unit">
        <template
          v-if="modulesAmount === 1"
        >
          Модуль
        </template>
        <template
          v-else-if="modulesAmount >= 2 && modulesAmount <= 4"
        >
          Модуля
        </template>
        <template v-else>
          Модулей
        </template>
      </div>
    </div>
    <div
      v-if="lessonsAmount"
      class="program-info__lessons"
    >
      <div class="program-info__amount">
        {{ lessonsAmount }}
      </div>
      <div class="program-info__unit">
        <template
          v-if="lessonsAmount === 1"
        >
          Онлайн-курс
        </template>
        <template
          v-else-if="lessonsAmount >= 2 && lessonsAmount <= 4"
        >
          Онлайн-курса
        </template>
        <template v-else>
          Онлайн-курсов
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  description: {
    type: String,
    required: true,
  },
  modulesAmount: {
    type: Number,
    required: false,
    default: null,
  },
  lessonsAmount: {
    type: Number,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/programInfo";
</style>
