<template>
  <div
    v-if="course.program"
    class="course-view-program"
  >
    <h2 class="title title--1 course-view-program--title">
      Программа курса
    </h2>

    <div
      v-if="description"
      class="course-view-program__top"
    >
      <div class="course-view-program__description">
        <ClientOnly>
          {{ description }}
        </ClientOnly>
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
      HERE
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
} from 'vue';

import duration from '@/helpers/duration';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const description = computed(() => {
  let text = '';

  if (props.course.duration && props.course.duration_unit) {
    text += `Программа курса расчитана на ${duration(props.course.duration, props.course.duration_unit)}.`;
  }

  if (props.course.modules_amount || props.course.lessons_amount) {
    if (props.course.modules_amount) {
      text += ' В курсе ';

      if (props.course.modules_amount === 1) {
        text += 'представлен ';
      } else {
        text += 'представлено ';
      }

      text += props.course.modules_amount;

      if (props.course.modules_amount === 1) {
        text += ` модуль${props.course.lessons_amount ? ', который' : ','}`;
      } else if (props.course.modules_amount >= 2 && props.course.modules_amount <= 4) {
        text += ` модуля${props.course.lessons_amount ? ', которые' : ','}`;
      } else {
        text += ` модулей${props.course.lessons_amount ? ', которые' : ','}`;
      }

      if (props.course.lessons_amount) {
        text += ` содержат ${props.course.lessons_amount} `;

        if (props.course.lessons_amount === 1) {
          text += 'онлайн-курс,';
        } else if (props.course.lessons_amount >= 2 && props.course.lessons_amount <= 4) {
          text += 'онлайн-курса,';
        } else {
          text += 'онлайн-курсов,';
        }
      }
    } else if (props.course.lessons_amount) {
      text += ' В курсе ';

      text += props.course.lessons_amount;

      if (props.course.lessons_amount === 1) {
        text += ' онлайн-курс,';
      } else if (props.course.lessons_amount >= 2 && props.course.lessons_amount <= 4) {
        text += ' онлайн-курса,';
      } else {
        text += ' онлайн-курсов,';
      }
    }

    text += ` что ${props.course.lessons_amount === 1 ? 'состоит' : 'состоят'} из видеолекций и практических заданий, которые вы разберете вместе со спикерами.`;
  }

  return text;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewProgram.scss";
</style>
