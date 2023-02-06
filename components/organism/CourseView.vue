<template>
  <div class="course-view">
    <Bubbles>
      <div class="content">
        <div class="course-view__header">
          <div class="course-view__side course-view__side--left">
            <h1 class="title title--1">
              Houdini c нуля до PRO — курс по созданию визуальных эффектов от Skillbox
            </h1>

            <div class="course-view__description">
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
          <div class="course-view__side course-view__side--right">
            <CourseViewCard
              :course="course"
            />
          </div>
        </div>
      </div>
    </Bubbles>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Bubbles from '@/components/atoms/Bubbles.vue';
import Fact from '@/components/atoms/Fact.vue';
import CourseViewCard from '@/components/molecules/CourseViewCard.vue';
import Facts from '@/components/molecules/Facts.vue';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ICourse from '@/interfaces/components/molecules/course';

const course = ref<ICourse>({
  id: 12,
  name: 'Houdini c нуля до PRO — курс по созданию визуальных эффектов',
  link: 'context',
  url: 'http//:yandex.ru/',
  rating: 5,
  image: 'https://loc-api.courselandia.ru/storage/uploaded/images/courses/1.webp',
  price: 90000,
  price_old: 130000,
  price_recurrent_price: 4000,
  currency: ECurrency.RUB,
  duration: 24,
  duration_unit: EDuration.MONTH,
  lessons_amount: 90,
  school: {
    name: 'Нетология',
    image: 'https://loc-api.courselandia.ru/storage/uploaded/images/brands/4.png',
    link: 'netology',
  },
},);
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/courseView.scss";
</style>
