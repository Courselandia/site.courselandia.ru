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
        <Fact>
          <template #title>
            Направление
          </template>
          <template #value>
            <nuxt-link to="/4" class="link">
              Дизайн
            </nuxt-link>
          </template>
        </Fact>
        <Fact>
          <template #title>
            Профессия
          </template>
          <template #value>
            <nuxt-link to="/3" class="link">
              Арт Директор
            </nuxt-link>
          </template>
        </Fact>
        <Fact>
          <template #title>
            Категория
          </template>
          <template #value>
            <nuxt-link to="/1" class="link">
              Графический дизайн
            </nuxt-link>
          </template>
        </Fact>
        <Fact>
          <template #title>
            Язык
          </template>
          <template #value>
            <nuxt-link to="/2" class="link">
              Русский
            </nuxt-link>
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