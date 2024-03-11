<template>
  <div class="info">
    <div
      v-if="course.online === true || course.online === false"
      class="info__block"
    >
      <div class="info__title">
        Формат обучения
      </div>
      <div class="info__value">
        {{ course.online ? 'Онлайн' : 'Оффлайн' }}
      </div>
    </div>

    <div class="info__block">
      <div class="info__title">
        Длительность
      </div>
      <div class="info__value">
        {{ duration(course.duration, course.duration_unit) }}
      </div>
    </div>

    <div
      v-if="course.tools?.length"
      class="info__block"
    >
      <div class="info__title">
        Инструменты
      </div>
      <div class="info__value">
        <template
          v-for="(tool, key) in course.tools"
          :key="key"
        >
          <nuxt-link
            :to="tool.link"
            class="link"
          >
            {{ tool.label }}
          </nuxt-link>{{ key !== (course.tools.length - 1) ? ', ' : '' }}
        </template>
      </div>
    </div>

    <div
      v-if="course.levels?.length"
      class="info__block"
    >
      <div class="info__title">
        Уровень
      </div>
      <div class="info__value">
        <template
          v-for="(level, key) in course.levels"
          :key="key"
        >
          {{ level.label }}{{ key !== (course.levels.length - 1) ? ', ' : '' }}
        </template>
      </div>
    </div>

    <div
      v-if="course.skills?.length"
      class="info__block"
    >
      <div class="info__title">
        Навыки
      </div>
      <div class="info__value">
        <template
          v-for="(skill, key) in course.skills"
          :key="key"
        >
          <nuxt-link
            :to="skill.link"
            class="link"
          >
            {{ skill.label }}
          </nuxt-link>{{ key !== (course.skills.length - 1) ? ', ' : '' }}
        </template>
      </div>
    </div>

    <div
      v-if="course.teachers?.length"
      class="info__block"
    >
      <div class="info__title">
        Авторы
      </div>
      <div class="info__value">
        <template
          v-for="(teacher, key) in course.teachers"
          :key="key"
        >
          <nuxt-link
            :to="teacher.link"
            class="link"
          >
            {{ teacher.label }}
          </nuxt-link>{{ key !== (course.teachers.length - 1) ? ', ' : '' }}
        </template>
      </div>
    </div>

    <div class="info__block">
      <div class="info__title">
        Идентификатор
      </div>
      <div class="info__value">
        #{{ course.id }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import duration from '@/helpers/duration';
import type ICourse from '~/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/info";
</style>
