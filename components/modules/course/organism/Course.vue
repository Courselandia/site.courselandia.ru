<template>
  <div>
    <div class="course">
      <Header
        :course="courseItem"
      />
      <div
        ref="contentRef"
        class="course__content content"
      >
        <div ref="cardRef">
          <Card
            v-if="courseItem"
            :course="courseItem"
            :scroll="scroll"
          />
        </div>
        <div class="course__info">
          <Learn
            :course="courseItem"
          />
          <Salaries
            :course="courseItem"
          />
          <Processes
            :course="courseItem"
          />
          <Program
            :course="courseItem"
          />
          <Teachers
            :course="courseItem"
          />
          <Employments
            :course="courseItem"
          />
          <Info
            :course="courseItem"
          />
          <Faqs
            :school="school"
          />
        </div>
      </div>

      <Follow
        :course="courseItem"
      />
    </div>

    <Similarities
      :courses="courseSimilarities"
    />
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
import Card from '@/components/modules/course/molecules/Card.vue';
import Employments from '@/components/modules/course/organism/Employments.vue';
import Faqs from '@/components/modules/course/organism/Faqs.vue';
import Follow from '@/components/modules/course/organism/Follow.vue';
import Header from '@/components/modules/course/organism/Header.vue';
import Info from '@/components/modules/course/organism/Info.vue';
import Learn from '@/components/modules/course/organism/Learn.vue';
import Processes from '@/components/modules/course/organism/Processes.vue';
import Program from '@/components/modules/course/organism/Program.vue';
import Salaries from '@/components/modules/course/organism/Salaries.vue';
import Similarities from '@/components/modules/course/organism/Similarities.vue';
import Teachers from '@/components/modules/course/organism/Teachers.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import { courseStoreToCourseComponent } from '@/converts/courseStoreToCourseComponent';
import EDuration from '@/enums/components/molecules/duration';
import { brToRn, stripTags } from '@/helpers/format';
import type ITeacher from '@/interfaces/components/modules/catalog/teacher';
import type ICourse from '@/interfaces/components/modules/course';

const config = useRuntimeConfig();
const scroll = ref(true);
const contentRef = ref<HTMLElement | null>(null);

const setScroll = (): void => {
  const card = document.querySelector('#course-card');

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

const description = ref('');
const title = ref('');

try {
  const courseResponseStore = await apiGetCourse(
    school as string,
    course as string,
  );

  if (courseResponseStore) {
    courseItem.value = courseStoreToCourseComponent(courseResponseStore.course);
    courseSimilarities.value = coursesStoreToCoursesComponent(courseResponseStore.similarities);

    const descriptionDefault = 'В каталоге Courselandia вы можете найти подходящий курс по различным направлениям. Только лучшие курсы со всей нужной информацией от ведущих онлайн школ.';
    title.value = courseItem.value?.metatag?.title || `${courseItem.value?.name} от ${courseItem.value?.school?.name}`;
    description.value = courseItem.value?.metatag?.description || descriptionDefault;
  }
} catch (error: any) {
  console.error(error.message);
}

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: courseItem.value?.image?.path ? courseItem.value.image.path : `${config.public.apiUrl}/storage/uploaded/images/prev.png`,
    },
    {
      property: 'og:image:width',
      content: courseItem.value?.image?.width ? courseItem.value.image.width : '1200',
    },
    {
      property: 'og:image:height',
      content: courseItem.value?.image?.height ? courseItem.value.image.height : '630',
    },
  ],
});

const courseJsonLd = computed<any>(() => {
  const instructors = courseItem.value?.teachers?.map((item: ITeacher) => ({
    '@type': 'Person',
    name: item.label,
    jobTitle: item.extra,
    image: null,
    url: `${config.public.siteUrl}${item.link}`,
  }));

  const getCourseWorkload = (
    duration: number,
    durationUnit: EDuration,
  ): string | null => {
    if (duration && durationUnit) {
      let result = `P${duration}`;

      if (durationUnit === EDuration.DAY) {
        result += 'D';
      } else if (durationUnit === EDuration.WEEK) {
        result += 'W';
      } else if (durationUnit === EDuration.MONTH) {
        result += 'M';
      } else if (durationUnit === EDuration.YEAR) {
        result += 'Y';
      }

      return result;
    }

    return null;
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseItem.value?.name,
    description: stripTags(brToRn(courseItem.value?.text || '')),
    url: courseItem.value?.link ? `${config.public.siteUrl}${courseItem.value?.link}` : '',
    inLanguage: courseItem.value?.language,
    isAccessibleForFree: (!courseItem.value?.price && !courseItem.value?.price_recurrent && !courseItem.value?.price_old) ? 'http://schema.org/False' : 'http://schema.org/True',
    provider: {
      '@type': 'Organization',
      name: courseItem.value?.school?.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: courseItem.value?.rating,
      ratingCount: '1',
    },
    offers: {
      '@type': 'Offer',
      url: courseItem.value?.link ? `${config.public.siteUrl}${courseItem.value?.link}` : '',
      name: courseItem.value?.school?.name,
      category: courseItem.value?.categories?.[0]?.label || 'Онлайн курс',
      availability: 'OnlineOnly',
      price: courseItem.value?.price || 0,
      priceCurrency: courseItem.value?.currency,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: courseItem.value?.school?.name,
      description: stripTags(brToRn(courseItem.value?.text || '')),
      courseMode: [
        courseItem.value?.online ? 'online' : 'offline',
      ],
      offers: {
        '@type': 'Offer',
        url: courseItem.value?.link ? `${config.public.siteUrl}${courseItem.value?.link}` : '',
        name: courseItem.value?.school?.name,
        category: courseItem.value?.categories?.[0]?.label || 'Онлайн курс',
        availability: 'OnlineOnly',
        price: courseItem.value?.price || 0,
        priceCurrency: courseItem.value?.currency,
      },
      instructor: instructors,
      courseWorkload: (
        courseItem.value?.duration
        && courseItem.value?.duration_unit
      ) ? getCourseWorkload(courseItem.value.duration, courseItem.value.duration_unit) : null,
    },
  };
});

useJsonld(courseJsonLd.value);

const breadcrumbsJsonLd = computed<any>(() => {
  const [direction] = courseItem.value?.directions || [];
  const [category] = courseItem.value?.categories || [];

  const result: any = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        name: 'Courselandia',
        position: 1,
        item: {
          '@type': 'Thing',
          '@id': config.public.siteUrl,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'WebPage',
          '@id': `${config.public.siteUrl}${courseItem.value?.school?.link}`,
          name: courseItem.value?.school?.name,
        },
      },
    ],
  };

  if (direction) {
    const position = result.itemListElement.length;

    result.itemListElement[position] = {
      '@type': 'ListItem',
      position: position + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}${direction.link}`,
        name: direction.name,
      },
    };
  }

  if (category) {
    const position = result.itemListElement.length;

    result.itemListElement[position] = {
      '@type': 'ListItem',
      position: position + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}${category.link}`,
        name: category.label,
      },
    };
  }

  const position = result.itemListElement.length;

  result.itemListElement[position] = {
    '@type': 'ListItem',
    position: position + 1,
    name: courseItem.value?.header,
  };

  return result;
});

useJsonld(breadcrumbsJsonLd.value);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/organism/course";
</style>
