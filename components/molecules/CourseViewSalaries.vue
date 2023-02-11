<template>
  <div class="course-view-salaries">
    <div class="course-view-salaries__header">
      <div class="course-view-salaries__side">
        <div class="course-view-salaries__title">
          Как быстро окупится обучение
        </div>
        <div class="course-view-salaries__separator" />
      </div>
      <div class="course-view-salaries__info">
        <div class="course-view-salaries__explanation">
          На позиции Senior вы заработаете столько же, сколько стоит курс,
        </div>
        <div class="course-view-salaries__duration">
          за 1 Месяц
        </div>
      </div>
    </div>
    <div class="course-view-salaries__professions">
      <div class="course-view-salaries__profession">
        <div class="course-view-salaries__name">
          Зарплата VFX-художника: 35 000 ₽ — 250 000 ₽
        </div>
        <div class="course-view-salaries__slider" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
} from 'vue';

import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const min = 40000;
const max = 120000;
const step = 1000;
const salary = ref(min);

const getLabelPrice = () => '₽';
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewSalaries.scss";
</style>
