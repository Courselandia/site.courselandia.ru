<template>
  <div
    v-if="course.program"
    class="course-view-program"
  >
    <h2 class="title title--1 course-view-program--title">
      Программа курса
    </h2>

    <div
      v-if="course.modules_amount || course.lessons_amount"
      class="course-view-program__top"
    >
      <div class="course-view-program__description">
        <template v-if="course.duration && course.duration_unit">
          Программа курса расчитана на {{ duration(course.duration, course.duration_unit) }}.
        </template>
        В курсе
        <template
          v-if="course.modules_amount === 1"
        >
          представлен
        </template>
        <template
          v-else
        >
          представлено
        </template>
        {{ course.modules_amount }}
        <template
          v-if="course.modules_amount === 1"
        >
          модуль, который
        </template>
        <template
          v-else-if="course.modules_amount >= 2 && course.modules_amount <= 4"
        >
          модуля, которые
        </template>
        <template v-else>
          модулей, которые
        </template>
        содержат {{ course.lessons_amount }}
        <template
          v-if="course.modules_amount === 1"
        >
          онлайн-курс.
        </template>
        <template
          v-else-if="course.modules_amount >= 2 && course.modules_amount <= 4"
        >
          онлайн-курса.
        </template>
        <template v-else>
          онлайн-курсов.
        </template>
        содержащих видеолекций и практические задания, которые вы разберете вместе со спикерами.
      </div>
      <div
        v-if="course.modules_amount"
        class="course-view-program__modules"
      >
        <div class="course-view-program__amount">
          {{ course.modules_amount }}
        </div>
        <div class="course-view-program__unit">
          <template
            v-if="course.modules_amount === 1"
          >
            Модуль
          </template>
          <template
            v-else-if="course.modules_amount >= 2 && course.modules_amount <= 4"
          >
            Модуля
          </template>
          <template v-else>
            Модулей
          </template>
        </div>
      </div>
      <div
        v-if="course.lessons_amount"
        class="course-view-program__lessons"
      >
        <div class="course-view-program__amount">
          {{ course.lessons_amount }}
        </div>
        <div class="course-view-program__unit">
          <template
            v-if="course.modules_amount === 1"
          >
            Онлайн-курс
          </template>
          <template
            v-else-if="course.modules_amount >= 2 && course.modules_amount <= 4"
          >
            Онлайн-курса
          </template>
          <template v-else>
            Онлайн-курсов
          </template>
        </div>
      </div>
    </div>

    <div class="course-view-program__bottom">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import duration from '@/helpers/duration';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewProgram.scss";
</style>
