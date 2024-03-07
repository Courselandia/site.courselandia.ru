<template>
  <div
    v-if="schoolItem"
    class="reviews"
  >
    <div class="reviews__header">
      <Bubbles>
        <div class="content">
          <Header
            :school="schoolItem"
          />
        </div>
      </Bubbles>
    </div>
    <div
      ref="contentRef"
      class="reviews__content content"
    >
      <div ref="cardRef">
        <Card
          :school="schoolItem"
          :scroll="scroll"
          :rating="ratingCurrent || 0"
          @filter="onFilter"
        />
      </div>
      <div class="reviews__info">
        <Sort
          v-model:sorts="sorts"
        />
        <ScrollLoader
          :stop="stopScrollLoader"
          :distance="1000"
          @load="onLoadScrolling"
        >
          <Loader
            :active="loading"
            color="white-transparency"
          >
            <div class="reviews__reviews">
              <div
                v-for="(review, index) in reviews"
                :key="index"
                class="reviews__review"
              >
                <Rate
                  :value="review.rating"
                  class="reviews__review-rate"
                />
                <div
                  v-if="review.title"
                  class="reviews__review-title"
                >
                  {{ review.title }}
                </div>
                <div
                  v-if="review.review"
                  class="reviews__review-text"
                  v-html="rnToBr(review.review)"
                />
                <template
                  v-if="review.advantages"
                >
                  <div class="reviews__review-sub-title">
                    Достоинства
                  </div>
                  <div
                    class="reviews__review-text"
                    v-html="rnToBr(review.advantages)"
                  />
                </template>
                <template
                  v-if="review.disadvantages"
                >
                  <div class="reviews__review-sub-title">
                    Недостатки
                  </div>
                  <div
                    class="reviews__review-text"
                    v-html="rnToBr(review.disadvantages)"
                  />
                </template>
                <div
                  v-if="review.name || review.created_at || review.source"
                  class="reviews__review-info"
                >
                  <div class="reviews__review-avatar">
                    <Animal />
                  </div>
                  <div class="reviews__review-name-and-date">
                    <div
                      v-if="review.name"
                      class="reviews__review-name"
                    >
                      {{ review.name }}
                    </div>
                    <div
                      v-if="review.created_at"
                      class="reviews__review-date"
                    >
                      {{ dayjs.utc(review.created_at).tz(dayjs.tz.guess()).format('D MMMM YYYY') }}
                    </div>
                  </div>
                  <div
                    v-if="review.source"
                    class="reviews__review-source"
                  >
                    {{ getDomain(review.source) }}
                  </div>
                </div>
              </div>
            </div>
          </Loader>
        </ScrollLoader>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadReviews } from '@/api/review';
import Animal from '@/components/atoms/Animal.vue';
import Bubbles from '@/components/atoms/Bubbles.vue';
import Loader from '@/components/atoms/Loader.vue';
import Rate from '@/components/atoms/Rate.vue';
import ScrollLoader from '@/components/atoms/ScrollLoader.vue';
import Card from '@/components/modules/reviews/molecules/Card.vue';
import Header from '@/components/modules/reviews/molecules/Header.vue';
import Sort from '@/components/modules/reviews/molecules/Sort.vue';
import {
  brToRn,
  rnToBr,
  stripTags,
} from '@/helpers/format';
import plural from '@/helpers/plural';
import type { IResponseItems } from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type IReview from '@/interfaces/stores/review/review';

const route = useRoute();

const {
  rating,
} = route.query;

const getDefaultSort = (sortQuery: string | null): ISorts => {
  if (sortQuery === 'date_asc') {
    return {
      created_at: 'ASC',
    };
  }

  if (sortQuery === 'rating_asc') {
    return {
      rating: 'ASC',
    };
  }

  if (sortQuery === 'rating_desc') {
    return {
      rating: 'DESC',
    };
  }

  return {
    created_at: 'DESC',
  };
};

let ratingQuery: number | null = null;

if (rating && Number(rating)) {
  ratingQuery = Number(rating);
}

const scroll = ref(true);
const contentRef = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();
const limit = 20;
const currentPage = ref(1);
const total = ref<number>();
const reviews = ref<Array<IReview>>();
const loading = ref(false);
const ratingCurrent = ref(ratingQuery || null);
const stopScrollLoader = ref(false);
const sort = ref<ISort>(getDefaultSort(route.query.sort as string));

const {
  link,
} = route.params;

const setUrlQuery = (): void => {
  const queries: Array<string> = [];

  if (currentPage.value && currentPage.value !== 1) {
    queries.push(`page=${currentPage.value}`);
  }

  if (sort.value) {
    if (sort.value.sortBy === 'created_at' && sort.value.sortOrder === 'ASC') {
      queries.push('sort=date_asc');
    } else if (sort.value.sortBy === 'rating' && sort.value.sortOrder === 'ASC') {
      queries.push('sort=rating_asc');
    } else if (sort.value.sortBy === 'rating' && sort.value.sortOrder === 'DESC') {
      queries.push('sort=rating_desc');
    }
  }

  if (ratingCurrent.value) {
    queries.push(`rating=${ratingCurrent.value}`);
  }

  const query = queries.join('&');
  let url = `/reviews/${link}`;

  if (query) {
    url = `${url}?${query}`;
  }

  const newState = {
    current: url,
  };

  window.history.pushState(
    newState,
    '',
    url,
  );
};

const setScroll = (): void => {
  const card = document.querySelector('#reviews-card');

  if (contentRef.value && card) {
    const gapHeight = window.screen.availHeight - card.getBoundingClientRect().height - 150;
    const height = contentRef.value.offsetHeight;
    const top = contentRef.value.offsetTop;
    const screenHeight = window.screen.availHeight;
    const lineBottom = height + top - screenHeight + gapHeight;

    scroll.value = window.scrollY <= lineBottom;
  }
};

const loadReviews = async (fetch: boolean): Promise<IResponseItems<IReview> | null> => {
  try {
    return await apiReadReviews(
      fetch,
      link as string,
      (currentPage.value - 1) * limit,
      limit,
      sort.value,
      ratingCurrent.value,
    );
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const response = await loadReviews(!Object.keys(route.query).length);
reviews.value = response?.data;
total.value = response?.total;

const loadSchool = async (): Promise<ISchoolLink | null> => {
  try {
    return await $fetch('/api/school/link', {
      params: {
        link: link as string,
      },
    });
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const reloadReviews = async (): Promise<void> => {
  loading.value = true;
  const res = await loadReviews(false);
  reviews.value = res?.data;
  total.value = res?.total;
  stopScrollLoader.value = false;
  setUrlQuery();
  loading.value = false;
};

watch(sort, async () => {
  await reloadReviews();
});

/*
const onFilter = async (rtng: number | null): Promise<void> => {
  ratingCurrent.value = rtng;
  currentPage.value = 1;

  loading.value = true;
  const res = await loadReviews(false);
  reviews.value = res?.data;
  total.value = res?.total;
  stopScrollLoader.value = false;
  setUrlQuery();
  loading.value = false;
};

const onSort = async (field: string, order: TOrder): Promise<void> => {
  sorts.value = {};
  sorts.value[field] = order;

  loading.value = true;
  const res = await loadReviews(false);
  reviews.value = res?.data;
  total.value = res?.total;
  setUrlQuery();
  loading.value = false;
};
 */

const onLoadScrolling = async (): Promise<void> => {
  currentPage.value++;

  const res = await loadReviews(false);

  if (res?.data && reviews.value) {
    reviews.value = reviews.value.concat(res.data);
  }

  setUrlQuery();

  if ((currentPage.value * limit) >= (total.value || 0)) {
    stopScrollLoader.value = true;
  }
};

const getDomain = (url: string): string => {
  const urlObj = new URL(url);

  return urlObj.host;
};

const schoolItem = ref<ISchoolLink | null>(await loadSchool());

onMounted(async () => {
  window.addEventListener('scroll', () => {
    setScroll();
  });

  setScroll();
});

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};
const title = `Школа ${schoolItem.value?.name}: ${schoolItem.value?.amount_courses?.all || 0} ${plural(schoolItem.value?.amount_courses?.all || 0, conditions)} (${schoolItem.value?.rating}⭐️) от учеников проходивших курсы`;
const description = `Список проверенных отзывов о школе ${schoolItem.value?.name} от реальных учеников, проходивших курсы. ${schoolItem.value?.amount_courses?.all || 0} ${plural(schoolItem.value?.amount_courses?.all || 0, conditions)} со средней оценкой ${schoolItem.value?.rating}⭐️`;

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
  ],
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/reviews/${link}`,
    },
  ],
});

const reviewsJsonld = computed<any>((): any => {
  return Object.values(reviews.value || []).map<any>(
    (review: IReview): any => {
      let desc = '';

      if (review.review) {
        desc += review.review;
      }

      if (review.advantages) {
        if (desc) {
          desc += '\n';
        }

        desc += `Достоинства: ${review.advantages}`;
      }

      if (review.disadvantages) {
        if (desc) {
          desc += '\n';
        }

        desc += `Недостатки: ${review.disadvantages}`;
      }

      const result: any = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: review.title,
        description: desc,
        itemReviewed: {
          '@type': 'MediaObject',
          name: schoolItem.value?.name,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
      };

      if (review.name) {
        result.author = {
          '@type': 'Person',
          name: review.name,
        };
      }

      return result;
    },
  );
});

reviewsJsonld.value.forEach((reviewJsonld: any) => {
  useJsonld(reviewJsonld);
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Product',
  category: 'Онлайн курсы',
  name: schoolItem.value?.name,
  image: schoolItem.value?.image_logo_id?.path,
  description: stripTags(brToRn(schoolItem.value?.text || '')),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: schoolItem.value?.rating || 0,
    reviewCount: schoolItem.value?.reviews_count,
    bestRating: '5',
    worstRating: '1',
  },
});
</script>

<style lang="scss" scoped>
@import "assets/scss/components/modules/reviews/index";
</style>
