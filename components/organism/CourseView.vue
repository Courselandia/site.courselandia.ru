<template>
  <div class="course-view">
    <Bubbles>
      <div class="content">
        <CourseViewHeader
          :course="course"
        />
      </div>
    </Bubbles>
    <div
      ref="contentRef"
      class="course-view__content content"
    >
      <div ref="cardRef">
        <CourseViewCard
          :course="course"
          :scroll="scroll"
        />
      </div>

      <div class="course-view__info">
        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Чему вы научитесь
          </h2>

          <CourseViewLearn
            :course="course"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <CourseViewSalaries
            :course="course"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Как проходит обучение
          </h2>

          <CourseViewProcesses
            :course="course"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Преподаватели
          </h2>

          <CourseViewTeachers
            :course="course"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Помощь с трудоустройством
          </h2>

          <CourseViewEmployments
            :course="course"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Информация
          </h2>

          <CourseViewInfo
            :course="course"
          />
        </div>

        <div>
          <h2 class="title title--1">
            Часто задаваемые вопросы
          </h2>

          <CourseViewFaqs
            :course="course"
          />
        </div>
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
import CourseViewCard from '@/components/molecules/CourseViewCard.vue';
import CourseViewEmployments from '@/components/molecules/CourseViewEmployments.vue';
import CourseViewFaqs from '@/components/molecules/CourseViewFaqs.vue';
import CourseViewFollow from '@/components/molecules/CourseViewFollow.vue';
import CourseViewHeader from '@/components/molecules/CourseViewHeader.vue';
import CourseViewInfo from '@/components/molecules/CourseViewInfo.vue';
import CourseViewLearn from '@/components/molecules/CourseViewLearn.vue';
import CourseViewProcesses from '@/components/molecules/CourseViewProcesses.vue';
import CourseViewSalaries from '@/components/molecules/CourseViewSalaries.vue';
import CourseViewTeachers from '@/components/molecules/CourseViewTeachers.vue';
import ECurrency from '@/enums/components/molecules/currency';
import EDuration from '@/enums/components/molecules/duration';
import ICourse from '@/interfaces/components/molecules/course';

const scroll = ref(true);
const contentRef = ref<HTMLElement | null>(null);

const setScroll = (): void => {
  const card = document.querySelector('#course-view-card');

  if (contentRef.value && card) {
    const gapHeight = window.screen.availHeight - card.getBoundingClientRect().height - 150;
    const height = contentRef.value.offsetHeight;
    const top = contentRef.value.offsetTop;
    const screenHeight = window.screen.availHeight;
    const lineBottom = height + top - screenHeight + gapHeight;

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
