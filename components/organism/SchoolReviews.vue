<template>
  <div class="school-reviews">
    <div class="school-reviews__directions">

    </div>
    <div class="school-reviews__items">
      <div class="school-reviews__header">
        <div class="school-reviews__th school-reviews__th--school">
          <span
            class="school-reviews__sortable"
            @click="onClickSort('label')"
            @keyup="onClickSort('label')"
          >
            Школа
          </span>
          <SortDirection
            field="label"
            :sort-by="sort.sortBy"
            :sort-order="sort.sortOrder as TSortOrder"
          />
        </div>
        <div class="school-reviews__th school-reviews__th--description">
          Описание
        </div>
        <div class="school-reviews__th school-reviews__th--courses">
          Курсы
        </div>
        <div class="school-reviews__th school-reviews__th--rating">
          <span
            class="school-reviews__sortable"
            @click="onClickSort('rating')"
            @keyup="onClickSort('rating')"
          >
            Рейтинг
          </span>
          <SortDirection
            field="rating"
            :sort-by="sort.sortBy"
            :sort-order="sort.sortOrder as TSortOrder"
          />
        </div>
      </div>
      <div
        v-if="listSchoolReviews"
        class="school-reviews__body"
      >
        <template
          v-for="(school, key) in listSchoolReviews"
        >
          <div
            v-if="school.reviews"
            :key="key"
            class="school-reviews__item"
          >
            <div class="school-reviews__group">
              <div class="school-reviews__td school-reviews__td--school">
                <LazyImage
                  v-if="school.image"
                  :src="school.image"
                  :alt="school.label"
                  :title="school.label"
                  class="school-reviews__logo"
                />
                <template
                  v-else
                >
                  {{ school.label }}
                </template>
              </div>
              <div class="school-reviews__td school-reviews__td--description">
                <div
                  class="school-reviews__text"
                  v-html="school.text"
                />
                <a
                  v-if="school.site"
                  :href="school.site"
                  class="link school-reviews__site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ school.site.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </div>
            <div class="school-reviews__group">
              <div class="school-reviews__td school-reviews__td--rating">
                <div class="school-reviews__reviews">
                  <div class="school-reviews__content-rating">
                    <div class="school-reviews__rating">
                      <div class="school-reviews__rating-value">
                        {{ school.rating }}
                      </div>
                      <div class="school-reviews__rating-star">
                        <Icon
                          name="star"
                          color="blue2"
                          :size="[30, 30]"
                          class="school-reviews__rating-star-icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="school-reviews__to-reviews">
                    <Button
                      :to="`/reviews/${school.link}`"
                    >
                      {{ school.reviews }}
                      <template v-if="school.reviews === 0 || school.reviews >= 5">
                        отзывов
                      </template>
                      <template v-else-if="school.reviews === 1">
                        отзыв
                      </template>
                      <template v-else-if="school.reviews >= 2 || school.reviews >= 4">
                        отзыва
                      </template>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  watch,
} from 'vue';
import {
  useRoute,
} from 'vue-router';

import { apiReadSchools } from '@/api/school';
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import SortDirection from '@/components/atoms/SortDirection.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
import EDirection from '@/enums/direction';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import ISort from '@/interfaces/sort';
import ISchool from '@/interfaces/stores/school/school';
import { TOrder } from '@/types/order';
import TSortOrder from '@/types/sortOrder';

const sortDefault: ISort = {
  sortBy: 'rating',
  sortOrder: 'DESC',
};
const route = useRoute();
const config = useRuntimeConfig();
const sortByCurrent = route.query.sortBy as string;
const sortOrderCurrent = route.query.sortOrder as string;
const directionCurrent = route.query.direction as string;

const sort = ref<ISort>({
  sortBy: sortByCurrent || sortDefault.sortBy,
  sortOrder: sortOrderCurrent as TOrder || sortDefault.sortOrder,
});
const schools = ref<Array<ISchool>>();
const direction = ref<EDirection | null>(Number(directionCurrent) as unknown as EDirection || null);

try {
  schools.value = await apiReadSchools(config.public.apiUrl, config.public.development);
} catch (error: any) {
  console.error(error.message);
}

const toHistory = (): void => {
  let url = '/reviews';
  const queries: Array<string> = [];

  if (
    sort.value.sortBy !== sortDefault.sortBy
    || sort.value.sortOrder !== sortDefault.sortOrder
  ) {
    queries[queries.length] = `sortBy=${sort.value.sortBy}&sortOrder=${sort.value.sortOrder}`;
  }

  if (direction.value) {
    queries[queries.length] = `direction=${direction.value}`;
  }

  if (queries.length) {
    url += `?${queries.join('&')}`;
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

watch(sort, () => {
  toHistory();
}, {
  deep: true,
});

watch(direction, () => {
  toHistory();
});

const listSchoolReviews = computed<IListSchoolReview[] | null>(() => {
  if (!schools.value) {
    return null;
  }

  let items = schoolsToSchoolReviews(schools.value);
  items = items.sort((first: IListSchoolReview, second: IListSchoolReview) => {
    if (sort.value.sortBy === 'label') {
      if (sort.value.sortOrder === 'ASC') {
        if (first.label < second.label) {
          return -1;
        }

        if (first.label > second.label) {
          return 1;
        }
      } else {
        if (first.label > second.label) {
          return -1;
        }

        if (first.label < second.label) {
          return 1;
        }
      }
    }

    if (sort.value.sortBy === 'rating') {
      if (sort.value.sortOrder === 'ASC') {
        if (first.rating < second.rating) {
          return -1;
        }

        if (first.rating > second.rating) {
          return 1;
        }
      } else {
        if (first.rating > second.rating) {
          return -1;
        }

        if (first.rating < second.rating) {
          return 1;
        }
      }
    }

    return 0;
  });

  if (direction.value) {
    items = items.filter((school: IListSchoolReview) => {
      if (direction.value === EDirection.PROGRAMMING) {
        return !!school.amount_courses.direction_programming;
      }

      if (direction.value === EDirection.MARKETING) {
        return !!school.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.DESIGN) {
        return !!school.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.BUSINESS) {
        return !!school.amount_courses.direction_business;
      }

      if (direction.value === EDirection.ANALYTICS) {
        return !!school.amount_courses.direction_analytics;
      }

      if (direction.value === EDirection.GAMES) {
        return !!school.amount_courses.direction_games;
      }

      if (direction.value === EDirection.OTHER) {
        return !!school.amount_courses.direction_other;
      }

      return false;
    });
  }

  return items;
});

const onClickSort = (field: string): void => {
  if (sort.value?.sortBy === field) {
    if (sort.value?.sortOrder === 'ASC') {
      sort.value.sortOrder = 'DESC';
      sort.value.sortBy = field;
    } else {
      sort.value.sortOrder = 'ASC';
      sort.value.sortBy = field;
    }
  } else {
    sort.value = {
      sortOrder: 'ASC',
      sortBy: field,
    };
  }
};

const onSelectDirection = (directionSelected: EDirection | null): void => {
  direction.value = directionSelected;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/schoolReviews.scss";
</style>
