<template>
  <div class="header">
    <div class="header__side header__side--left">
      <h1 class="title title--1">
        {{ course.header }}
      </h1>

      <Reducer
        v-if="course.text"
        class="header__description"
      >
        <span
          v-html="course.text"
        />
      </Reducer>

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
import type { PropType } from 'vue';

import Reducer from '@/components/atoms/Reducer.vue';
import Fact from '@/components/modules/course/atoms/Fact.vue';
import Facts from '@/components/modules/course/molecules/Facts.vue';
import language from '@/helpers/language';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/header";
</style>
