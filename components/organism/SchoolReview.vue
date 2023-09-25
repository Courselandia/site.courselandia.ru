<template>
  <div
    v-if="schoolItem"
    class="school-review"
  >
    <div class="school-review__header">
      <Bubbles>
        <div class="content">
          <SchoolReviewHeader
            :school="schoolItem"
          />
        </div>
      </Bubbles>
    </div>
    <div
      ref="contentRef"
      class="school-review__content content"
    >
      <div ref="cardRef">
        <SchoolReviewCard
          :school="schoolItem"
          :scroll="scroll"
          :rating="ratingCurrent || 0"
          @filter="onFilter"
        />
      </div>
      <div class="school-review__info">
        <div class="school-review__sorts">
          <div
            :class="`school-review__sort ${sorts.created_at ? 'school-review__sort--active' : ''}`"
            @click="onSort('created_at', sorts.created_at === 'ASC' ? 'DESC' : 'ASC')"
            @keyup="onSort('created_at', sorts.created_at === 'ASC' ? 'DESC' : 'ASC')"
          >
            <Icon
              v-if="sorts.created_at"
              :name="sorts.created_at === 'ASC' ? 'sort-asc' : 'sort-desc'"
              :size="[16, 16]"
              color="black"
              class="school-review__sort-icon"
            />
            <div class="school-review__sort-field">
              По дате
            </div>
          </div>
          <div
            :class="`school-review__sort ${sorts.rating ? 'school-review__sort--active' : ''}`"
            @click="onSort('rating', sorts.rating === 'ASC' ? 'DESC' : 'ASC')"
            @keyup="onSort('rating', sorts.rating === 'ASC' ? 'DESC' : 'ASC')"
          >
            <Icon
              v-if="sorts.rating"
              :name="sorts.rating === 'ASC' ? 'sort-asc' : 'sort-desc'"
              :size="[16, 16]"
              color="black"
              class="school-review__sort-icon"
            />
            <div class="school-review__sort-field">
              По оценке
            </div>
          </div>
        </div>
        <ScrollLoader
          :stop="stopScrollLoader"
          :distance="1000"
          @load="onLoadScrolling"
        >
          <Loader
            :active="loading"
            color="white-transparency"
          >
            <div class="school-review__reviews">
              <div
                v-for="(review, index) in reviews"
                :key="index"
                class="school-review__review"
              >
                <Rate
                  :value="review.rating"
                  class="school-review__review-rate"
                />
                <div
                  v-if="review.title"
                  class="school-review__review-title"
                >
                  {{ review.title }}
                </div>
                <div
                  v-if="review.review"
                  class="school-review__review-text"
                  v-html="rnToBr(review.review)"
                />
                <template
                  v-if="review.advantages"
                >
                  <div class="school-review__review-sub-title">
                    Достоинства
                  </div>
                  <div
                    class="school-review__review-text"
                    v-html="rnToBr(review.advantages)"
                  />
                </template>
                <template
                  v-if="review.disadvantages"
                >
                  <div class="school-review__review-sub-title">
                    Недостатки
                  </div>
                  <div
                    class="school-review__review-text"
                    v-html="rnToBr(review.disadvantages)"
                  />
                </template>
                <div
                  v-if="review.name || review.created_at || review.source"
                  class="school-review__review-info"
                >
                  <div class="school-review__review-avatar">
                    <Animal />
                  </div>
                  <div class="school-review__review-name-and-date">
                    <div
                      v-if="review.name"
                      class="school-review__review-name"
                    >
                      {{ review.name }}
                    </div>
                    <div
                      v-if="review.created_at"
                      class="school-review__review-date"
                    >
                      {{ dayjs.utc(review.created_at).tz(dayjs.tz.guess()).format('D MMMM YYYY') }}
                    </div>
                  </div>
                  <div
                    v-if="review.source"
                    class="school-review__review-source"
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
// eslint-disable-next-line import/no-unresolved
import { JsonLD, JsonLDFunc } from 'nuxt-jsonld/dist/types/index.d';
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadReviews } from '@/api/review';
import Animal from '@/components/atoms/Animal.vue';
import Bubbles from '@/components/atoms/Bubbles.vue';
import Icon from '@/components/atoms/Icon.vue';
import Loader from '@/components/atoms/Loader.vue';
import Rate from '@/components/atoms/Rate.vue';
import ScrollLoader from '@/components/atoms/ScrollLoader.vue';
import SchoolReviewCard from '@/components/molecules/SchoolReviewCard.vue';
import SchoolReviewHeader from '@/components/molecules/SchoolReviewHeader.vue';
import { brToRn, rnToBr, stripTags } from '@/helpers/format';
import plural from '@/helpers/plural';
import { IResponseItems } from '@/interfaces/response';
import ISorts from '@/interfaces/sorts';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import IReview from '@/interfaces/stores/review/review';
import { TOrder } from '@/types/order';

const route = useRoute();

const {
  sort,
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
const sorts = ref<ISorts>(getDefaultSort(sort as string));

const {
  link,
} = route.params;

const setUrlQuery = (): void => {
  const queries: Array<string> = [];

  if (currentPage.value && currentPage.value !== 1) {
    queries.push(`page=${currentPage.value}`);
  }

  if (sorts.value) {
    if (sorts.value.created_at && sorts.value.created_at === 'ASC') {
      queries.push('sort=date_asc');
    } else if (sorts.value.rating && sorts.value.rating === 'ASC') {
      queries.push('sort=rating_asc');
    } else if (sorts.value.rating && sorts.value.rating === 'DESC') {
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
  const card = document.querySelector('#school-review-card');

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
      sorts.value,
      ratingCurrent.value,
    );
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const response = await loadReviews(!Object.keys(route.query).length);
// loading.value = false;
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

const reviewsJsonld = computed<JsonLD[] | JsonLDFunc[]>((): JsonLD[] | JsonLDFunc[] => {
  const res = Object.values(reviews.value || []).map<JsonLD | JsonLDFunc>(
    (review: IReview): JsonLD | JsonLDFunc => {
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

      const result: JsonLD | JsonLDFunc = {
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

  return res;
});

reviewsJsonld.value.forEach((reviewJsonld) => {
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

<style lang="scss">
@import "@/assets/scss/components/organism/schoolReview.scss";
</style>
