<template>
  <div class="course-view-employments">
    <BlockCheck>
      <template #title>
        Создадите портфолио
      </template>
      <template #description>
        Научитесь оформлять портфолио так, чтобы работодателю было удобно
        изучать ваши работы и у него осталось хорошее впечатление
      </template>
    </BlockCheck>
    <BlockCheck>
      <template #title>
        Научитесь работать на себя
      </template>
      <template #description>
        Узнаете, где искать первых заказчиков, как выстраивать с ними
        коммуникацию и защитить свои права
      </template>
    </BlockCheck>
    <BlockCheck>
      <template #title>
        Научитесь работать на себя
      </template>
      <template #description>
        Узнаете, где искать первых заказчиков, как выстраивать с ними
        коммуникацию и защитить свои права
      </template>
    </BlockCheck>
    <BlockCheck>
      <template #title>
        Создадите портфолио
      </template>
      <template #description>
        Научитесь оформлять портфолио так, чтобы работодателю было удобно
        изучать ваши работы и у него осталось хорошее впечатление
      </template>
    </BlockCheck>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import BlockCheck from '@/components/atoms/BlockCheck.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewEmployments.scss";
</style>
