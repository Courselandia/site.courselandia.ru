<template>
  <div class="course-view-header">
    <div class="course-view-header__side course-view-header__side--left">
      <h1 class="title title--1">
        Houdini c нуля до PRO
      </h1>

      <div class="course-view-header__description">
        Курс рассчитан на 2 месяца, на протяжении которых вы овладеете навыками
        работы с трехмерной графикой в Houdini. Программа составлена таким образом,
        что подойдет и новичкам, и опытным аниматорам. Так, в рамках курса вы
        научитесь создавать анимированные разрушения и взрывы, дым, смерч, облака, которые
        в последствии могут быть использованы в играх, кино, рекламных роликах.
      </div>

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