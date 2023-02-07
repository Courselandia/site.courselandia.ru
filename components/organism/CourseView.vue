<template>
  <div class="course-view">
    <Bubbles>
      <div class="content">
        <div class="course-view__header">
          <div class="course-view__side course-view__side--left">
            <h1 class="title title--1">
              Houdini c нуля до PRO
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
        </div>
      </div>
    </Bubbles>
    <div
      ref="contentRef"
      class="course-view__content content"
    >
      <div
        :class="`course-view__course-view-card ${scroll ? 'course-view__course-view-card--scroll' : ''}`"
      >
        <CourseViewCard
          :course="course"
          :scroll="scroll"
        />
      </div>

      <div class="course-view__info">
        <h2 class="title title--1">
          Чему вы научитесь
        </h2>
        <Numerics>
          <Numeric number="1">
            Создавать анимированные изображения
          </Numeric>
          <Numeric number="2">
            Моделировать с помощью скриптов на Python
          </Numeric>
          <Numeric number="3">
            Анимировать природные явления
          </Numeric>
          <Numeric number="4">
            Работать в Houdini
          </Numeric>
          <Numeric number="5">
            Настраивать рендеринг
          </Numeric>
        </Numerics>
      </div>
    </div>
    <CourseViewFollow
      :course="course"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
} from 'vue';

import Bubbles from '@/components/atoms/Bubbles.vue';
import Fact from '@/components/atoms/Fact.vue';
import Numeric from '@/components/atoms/Numeric.vue';
import CourseViewCard from '@/components/molecules/CourseViewCard.vue';
import CourseViewFollow from '@/components/molecules/CourseViewFollow.vue';
import Facts from '@/components/molecules/Facts.vue';
import Numerics from '@/components/molecules/Numerics.vue';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ICourse from '@/interfaces/components/molecules/course';

const scroll = ref(true);
const contentRef = ref<HTMLElement | null>(null);

const setScroll = (): void => {
  const rect = contentRef.value?.getBoundingClientRect();

  if (rect) {
    const lineBottom = rect.top + rect.height;
    scroll.value = window.scrollY <= lineBottom;
  }
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    setScroll();
  });

  setScroll();
});

const course = ref<ICourse>({
  id: 12,
  name: 'Houdini c нуля до PRO',
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
});
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/courseView.scss";
</style>
