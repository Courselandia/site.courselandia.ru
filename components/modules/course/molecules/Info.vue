<template>
  <div class="info">
    <InfoBlock
      v-if="course.online === true || course.online === false"
    >
      <template #title>
        Формат обучения
      </template>
      <template #value>
        {{ course.online ? 'Онлайн' : 'Оффлайн' }}
      </template>
    </InfoBlock>

    <InfoBlock>
      <template #title>
        Длительность
      </template>
      <template #value>
        {{ duration(course.duration, course.duration_unit) }}
      </template>
    </InfoBlock>

    <InfoBlock
      v-if="course.tools?.length"
    >
      <template #title>
        Инструменты
      </template>
      <template #value>
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
      </template>
    </InfoBlock>

    <InfoBlock
      v-if="course.levels?.length"
    >
      <template #title>
        Уровень
      </template>
      <template #value>
        <template
          v-for="(level, key) in course.levels"
          :key="key"
        >
          {{ level.label }}{{ key !== (course.levels.length - 1) ? ', ' : '' }}
        </template>
      </template>
    </InfoBlock>

    <InfoBlock
      v-if="course.skills?.length"
    >
      <template #title>
        Навыки
      </template>
      <template #value>
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
      </template>
    </InfoBlock>

    <InfoBlock
      v-if="course.teachers?.length"
    >
      <template #title>
        Авторы
      </template>
      <template #value>
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
      </template>
    </InfoBlock>

    <InfoBlock>
      <template #title>
        Идентификатор
      </template>
      <template #value>
        #{{ course.id }}
      </template>
    </InfoBlock>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import InfoBlock from '@/components/modules/course/atoms/InfoBlock.vue';
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
