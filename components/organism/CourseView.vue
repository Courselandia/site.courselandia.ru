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
      <CourseViewCard
        :course="course"
        :scroll="scroll"
      />

      <div class="course-view__info">
        <CourseViewLearn
          :course="course"
        />
        <CourseViewSalaries
          :course="course"
        />
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
import CourseViewFollow from '@/components/molecules/CourseViewFollow.vue';
import CourseViewHeader from '@/components/molecules/CourseViewHeader.vue';
import CourseViewLearn from '@/components/molecules/CourseViewLearn.vue';
import CourseViewSalaries from '@/components/molecules/CourseViewSalaries.vue';
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
