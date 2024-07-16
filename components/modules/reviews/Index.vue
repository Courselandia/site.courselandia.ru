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
      id="school-reviews-content"
      class="reviews__content content"
    >
      <div>
        <Card
          v-model:rating="rating"
          :school="schoolItem"
          :scroll="scroll"
        />
      </div>
      <div class="reviews__info">
        <Sort
          v-model:sorts="sorts"
        />
        <List
          v-model:page="page"
          v-model:scroll="scroll"
          :link="link as string"
          :school-name="schoolItem.name"
          :sorts="sorts"
          :rating="rating || undefined"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiLinkSchool } from '@/api/school';
import Bubbles from '@/components/atoms/Bubbles.vue';
import Card from '@/components/modules/reviews/molecules/Card.vue';
import Header from '@/components/modules/reviews/molecules/Header.vue';
import List from '@/components/modules/reviews/molecules/List.vue';
import Sort from '@/components/modules/reviews/molecules/Sort.vue';
import {
  brToRn,
  stripTags,
} from '@/helpers/format';
import plural from '@/helpers/plural';
import type ISorts from '@/interfaces/sorts';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';

const route = useRoute();

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

if (route.query.rating && Number(route.query.rating)) {
  ratingQuery = Number(route.query.rating);
}

const page = ref(1);

if (route.query.page && Number(route.query.page)) {
  page.value = Number(route.query.page);
}

const scroll = ref(true);
const config = useRuntimeConfig();
const rating = ref(ratingQuery || undefined);
const sorts = ref<ISorts>(getDefaultSort(route.query.sort as string));

const {
  link,
} = route.params;

const setUrlQuery = (): void => {
  const queries: Array<string> = [];

  if (page.value && page.value !== 1) {
    queries.push(`page=${page.value}`);
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

  if (rating.value) {
    queries.push(`rating=${rating.value}`);
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

watch(sorts, () => {
  setUrlQuery();
}, {
  deep: true,
});

watch(page, () => {
  setUrlQuery();
});

watch(rating, () => {
  setUrlQuery();
});

const loadSchool = async (): Promise<ISchoolLink | null> => {
  try {
    return await apiLinkSchool(link as string);
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const schoolItem = ref<ISchoolLink | null>(await loadSchool());

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

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Product',
  category: 'Онлайн курсы',
  name: schoolItem.value?.name,
  image: schoolItem.value?.image_logo?.path,
  description: stripTags(brToRn(schoolItem.value?.text || '')),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: schoolItem.value?.rating || 0,
    reviewCount: schoolItem.value?.amount_reviews,
    bestRating: '5',
    worstRating: '1',
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/index";
</style>
