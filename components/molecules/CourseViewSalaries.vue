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
          Зарплата VFX-художника: {{ money(junior) }} ₽ — {{ money(senior) }} ₽
        </div>
        <div class="course-view-salaries__slider">
          <SliderSalary
            v-model:value="salary"
            :junior="junior"
            :middle="middle"
            :senior="senior"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
} from 'vue';

import SliderSalary from '@/components/molecules/SliderSalary.vue';
import { money } from '@/helpers/number';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const junior = 45000;
const middle = 150000;
const senior = 320000;
const salary = ref(45000);
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewSalaries.scss";
</style>

<style lang="css">
@import "@vueform/slider/themes/default.css";
</style>
