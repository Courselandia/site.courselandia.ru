<template>
  <div>
    <div class="course-view">
      <Bubbles>
        <div class="content">
          <CourseViewHeader
            v-if="courseItem"
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
            v-if="courseItem"
            :course="courseItem"
            :scroll="scroll"
          />
        </div>

        <div class="course-view__info">
          <div
            v-if="courseItem?.learns?.length"
            class="mb-40 mb-12-md"
          >
            <h2 class="title title--1">
              Чему вы научитесь
            </h2>

            <CourseViewLearn
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div
            v-if="hasSalaries"
            class="mb-40 mb-12-md"
          >
            <CourseViewSalaries
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div
            v-if="courseItem?.processes?.length"
            class="mb-40 mb-12-md"
          >
            <h2 class="title title--1">
              Как проходит обучение
            </h2>

            <CourseViewProcesses
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div
            v-if="courseItem?.teachers?.length"
            class="mb-40 mb-12-md"
          >
            <h2 class="title title--1">
              Преподаватели
            </h2>

            <CourseViewTeachers
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div
            v-if="courseItem?.employments?.length"
            class="mb-40 mb-12-md"
          >
            <h2 class="title title--1">
              Помощь с трудоустройством
            </h2>

            <CourseViewEmployments
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div class="mb-40 mb-12-md">
            <h2 class="title title--1">
              Информация
            </h2>

            <CourseViewInfo
              v-if="courseItem"
              :course="courseItem"
            />
          </div>

          <div
            v-if="faqItems?.length"
            class="mb-40 mb-12-md"
          >
            <h2 class="title title--1">
              Часто задаваемые вопросы
            </h2>

            <CourseViewFaqs
              :faqs="faqItems"
            />
          </div>
        </div>
      </div>

      <LazyClientOnly>
        <teleport to=".page">
          <CourseViewFollow
            v-if="courseItem"
            :course="courseItem"
          />
        </teleport>
      </LazyClientOnly>
    </div>

    <template
      v-if="courseSimilarities?.length"
    >
      <div class="content">
        <h2 class="title title--1">
          Похожие курсы
        </h2>

        <Courses
          :courses="courseSimilarities"
          class="mb-8"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiGetCourse } from '@/api/course';
import { apiReadFaqs } from '@/api/faq';
import Bubbles from '@/components/atoms/Bubbles.vue';
import Courses from '@/components/molecules/Courses.vue';
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
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import { courseStoreToCourseComponent } from '@/converts/courseStoreToCourseComponent';
import faqsStoreToFaqsComponent from '@/converts/faqsStoreToFaqsComponent';
import ICourse from '@/interfaces/components/molecules/course';
import IFaqComponent from '@/interfaces/components/molecules/faq';

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
const courseSimilarities = ref<ICourse[]>();

const setMeta = (): void => {
  const description = 'В каталоге Courselandia вы можете найти подходящий курс по различным направлениям. Только лучшие курсы со всей нужной информацией от ведущих онлайн школ.';
  const title = courseItem.value?.metatag?.title || `${courseItem.value?.name} от ${courseItem.value?.school?.name}`;
  const descriptionResult = courseItem.value?.metatag?.description || description;

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: descriptionResult,
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
    ],
  });
};

try {
  const courseResponseStore = await apiGetCourse(
    config.public.apiUrl,
    school as string,
    course as string,
  );

  if (courseResponseStore) {
    courseItem.value = courseStoreToCourseComponent(courseResponseStore.course);
    courseSimilarities.value = coursesStoreToCoursesComponent(courseResponseStore.similarities);

    setMeta();
  }
} catch (error: any) {
  console.error(error.message);
}

const faqItems = ref<Array<IFaqComponent>>([]);

try {
  const faqsStore = await apiReadFaqs(config.public.apiUrl, school as string);

  if (faqsStore) {
    faqItems.value = faqsStoreToFaqsComponent(faqsStore);
  }
} catch (error: any) {
  console.error(error.message);
}

const hasSalaries = computed((): boolean => {
  let has = false;

  if (courseItem.value?.professions) {
    courseItem.value?.professions.forEach((profession) => {
      if (profession.salaries?.length) {
        has = true;
      }
    });
  }

  return has;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/courseView.scss";
</style>
