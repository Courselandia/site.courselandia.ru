<template>
  <div class="course-view-header">
    <div class="course-view-header__side course-view-header__side--left">
      <h1 class="title title--1">
        {{ course.name }}
      </h1>

      <div
        v-if="course.text"
        class="course-view-header__description"
        v-html="course.text"
      />

      <Facts>
        <Fact
          v-if="course.directions?.length"
        >
          <template #title>
            Направление
          </template>
          <template #value>
            <template
              v-for="(direction, key) in course.directions"
              :key="key"
            >
              <nuxt-link
                :to="direction.link"
                class="link"
              >
                {{ direction.name }}
              </nuxt-link>{{ key !== (course.directions.length - 1) ? ', ' : '' }}
            </template>
          </template>
        </Fact>
        <Fact
          v-if="course.professions?.length"
        >
          <template #title>
            Профессия
          </template>
          <template #value>
            <template
              v-for="(profession, key) in course.professions"
              :key="key"
            >
              <nuxt-link
                :to="profession.link"
                class="link"
              >
                {{ profession.label }}
              </nuxt-link>{{ key !== (course.professions.length - 1) ? ', ' : '' }}
            </template>
          </template>
        </Fact>
        <Fact
          v-if="course.categories?.length"
        >
          <template #title>
            Категория
          </template>
          <template #value>
            <template
              v-for="(category, key) in course.categories"
              :key="key"
            >
              <nuxt-link
                :to="category.link"
                class="link"
              >
                {{ category.label }}
              </nuxt-link>{{ key !== (course.categories.length - 1) ? ', ' : '' }}
            </template>
          </template>
        </Fact>
        <Fact
          v-if="course.language"
        >
          <template #title>
            Язык
          </template>
          <template #value>
            {{ language(course.language) }}
          </template>
        </Fact>
      </Facts>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Fact from '@/components/atoms/Fact.vue';
import Facts from '@/components/molecules/Facts.vue';
import language from '@/helpers/language';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewHeader.scss";
</style>
