<template>
  <div class="course-view">
    <Bubbles>
      <div class="content">
        <CourseViewHeader
          :course="courseItem"
        />
      </div>
    </Bubbles>
    <div
      ref="contentRef"
      class="course-view__content content"
    >
      <div ref="cardRef">
        <CourseViewCard
          :course="courseItem"
          :scroll="scroll"
        />
      </div>

      <div class="course-view__info">
        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Чему вы научитесь
          </h2>

          <CourseViewLearn
            :course="courseItem"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <CourseViewSalaries
            :course="courseItem"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Как проходит обучение
          </h2>

          <CourseViewProcesses
            :course="courseItem"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Преподаватели
          </h2>

          <CourseViewTeachers
            :course="courseItem"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Помощь с трудоустройством
          </h2>

          <CourseViewEmployments
            :course="courseItem"
          />
        </div>

        <div class="mb-50 mb-15-md">
          <h2 class="title title--1">
            Информация
          </h2>

          <CourseViewInfo
            :course="courseItem"
          />
        </div>

        <div>
          <h2 class="title title--1">
            Часто задаваемые вопросы
          </h2>

          <CourseViewFaqs
            :course="courseItem"
          />
        </div>
      </div>
    </div>

    <LazyClientOnly>
      <teleport to=".page">
        <CourseViewFollow
          :course="courseItem"
        />
      </teleport>
    </LazyClientOnly>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiGetCourse } from '@/api/course';
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
import { courseStoreToCourseComponent } from '@/converts/courseStoreToCourseComponent';
import ICourse from '@/interfaces/components/molecules/course';

const config = useRuntimeConfig();
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

const route = useRoute();
const {
  school,
  course,
} = route.params;

const courseItem = ref<ICourse>();

try {
  const courseStore = await apiGetCourse(config.public.apiUrl, school as string, course as string);

  if (courseStore) {
    courseItem.value = courseStoreToCourseComponent(courseStore);
  }
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/courseView.scss";
</style>
