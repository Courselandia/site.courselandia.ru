<template>
  <div class="list">
    <div
      ref="contentRef"
      class="list__content"
    >
      <Loader
        :active="loading"
        color="white-transparency"
      >
        <Review
          v-for="(review, index) in reviews"
          :key="index"
          :review="review"
        />
      </Loader>
    </div>
    <div class="list__pagination">
      <Pagination
        :total="total"
        :size="limit"
        :page="pageValue"
        :link="getLinkPagination"
        @click="onClickPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadReviews } from '@/api/review';
import Loader from '@/components/atoms/Loader.vue';
import Pagination from '@/components/atoms/Pagination.vue';
import Review from '@/components/modules/reviews/molecules/Review.vue';
import type { IResponseItems } from '@/interfaces/response';
import type ISorts from '@/interfaces/sorts';
import type IReview from '@/interfaces/stores/review/review';

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  sorts: {
    type: Object as PropType<ISorts>,
    required: false,
    default: null,
  },
  rating: {
    type: Number,
    required: false,
    default: null,
  },
  page: {
    type: Number,
    required: false,
    default: 1,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:page': (_: number) => true,
  'update:scroll': (_: boolean) => true,
});

const {
  sorts,
  rating,
  link,
  schoolName,
  page,
  scroll,
} = toRefs(props);

const pageValue = ref(page.value);
const getLinkPagination = (pg: number): string => `/reviews/${link.value}?page=${pg}`;

watch(pageValue, () => {
  emit('update:page', pageValue.value);
});

watch(page, () => {
  pageValue.value = page.value;
});

const scrollValue = ref(scroll.value);

watch(scrollValue, () => {
  emit('update:scroll', scrollValue.value);
});

watch(scroll, () => {
  scrollValue.value = scroll.value;
});

const limit = 20;
const reviews = ref<Array<IReview>>();
const route = useRoute();
const total = ref<number>();
const loading = ref(false);
const contentRef = ref<HTMLElement | null>(null);

const loadReviews = async (
  fetch: boolean,
  offset: number,
  limitParam: number,
): Promise<IResponseItems<IReview> | null> => {
  try {
    return await apiReadReviews(
      fetch,
      link.value,
      offset,
      limitParam,
      sorts.value,
      rating.value,
    );
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const response = await loadReviews(
  !Object.keys(route.query).length,
  (pageValue.value - 1) * limit,
  limit,
);
reviews.value = response?.data;
total.value = response?.total;

const reloadReviews = async (): Promise<void> => {
  loading.value = true;
  const res = await loadReviews(false, (pageValue.value - 1) * limit, limit);
  reviews.value = res?.data;
  total.value = res?.total;
  loading.value = false;
};

watch(sorts, async () => {
  pageValue.value = 1;

  await reloadReviews();
}, {
  deep: true,
});

watch(rating, async () => {
  pageValue.value = 1;

  await reloadReviews();
});

const setScroll = (): void => {
  const card = document.getElementById('school-reviews-card');
  const content = document.getElementById('school-reviews-content');

  if (content && card) {
    const gapHeight = window.screen.availHeight - card.getBoundingClientRect().height - 150;
    const height = content.offsetHeight;
    const top = content.offsetTop;
    const screenHeight = window.screen.availHeight;
    const lineBottom = height + top - screenHeight + gapHeight;

    scrollValue.value = window.scrollY <= lineBottom;
  }
};

const onClickPage = async (toPage: number): Promise<void> => {
  pageValue.value = toPage;

  if (contentRef.value) {
    const y = contentRef.value.getBoundingClientRect().top + window.scrollY - 200;

    window.scroll({
      top: y,
      behavior: 'smooth',
    });
  }

  await reloadReviews();
};

onMounted(async () => {
  window.addEventListener('scroll', () => {
    setScroll();
  });

  setScroll();
});

const reviewsJsonld = computed<any>((): any => Object.values(reviews.value || []).map<any>(
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
        name: schoolName,
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
));

reviewsJsonld.value.forEach((reviewJsonld: any) => {
  useJsonld(reviewJsonld);
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/list";
</style>
