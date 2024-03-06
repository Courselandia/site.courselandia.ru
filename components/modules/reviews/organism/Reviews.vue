<template>
  <div class="reviews">
    <Directions
      v-model:direction="direction"
    />
    <div class="reviews__items">
      <div class="reviews__header">
        <div class="reviews__th reviews__th--school">
          <span
            class="reviews__sortable"
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
        <div class="reviews__th reviews__th--description">
          Описание
        </div>
        <div class="reviews__th reviews__th--courses">
          Курсы
        </div>
        <div class="reviews__th reviews__th--rating">
          <span
            class="reviews__sortable"
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
        class="reviews__body"
      >
        <template
          v-for="(school, key) in listSchoolReviews"
        >
          <div
            v-if="school.reviews"
            :key="key"
            class="reviews__item"
          >
            <div class="reviews__group">
              <div class="reviews__td reviews__td--school">
                <LazyImage
                  v-if="school.image"
                  :src="school.image"
                  :alt="school.label"
                  :title="school.label"
                  class="reviews__logo"
                />
                <template
                  v-else
                >
                  {{ school.label }}
                </template>
              </div>
              <div class="reviews__td reviews__td--description">
                <div
                  class="reviews__text"
                  v-html="school.text"
                />
                <a
                  v-if="school.site"
                  :href="school.site"
                  class="link reviews__site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ school.site.replace(/^https?:\/\//, '') }}
                </a>
              </div>
            </div>
            <div class="reviews__group">
              <div class="reviews__td reviews__td--courses">
                <Tags
                  v-if="school.amount_courses.all"
                >
                  <Tag
                    v-if="school.amount_courses.all"
                    :to="`/courses/school/${school.link}`"
                    bck="blue1"
                    cursor
                  >
                    <Plural
                      v-if="school.amount_courses.all"
                      :number="school.amount_courses.all"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />
                    от {{ school.label }}
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_programming"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.PROGRAMMING}`"
                    bck="blue1"
                    cursor
                  >
                    Программирование
                    (<Plural
                      v-if="school.amount_courses.direction_programming"
                      :number="school.amount_courses.direction_programming"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_marketing"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.MARKETING}`"
                    bck="blue1"
                    cursor
                  >
                    Маркетинг
                    (<Plural
                      v-if="school.amount_courses.direction_marketing"
                      :number="school.amount_courses.direction_marketing"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_design"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.DESIGN}`"
                    bck="blue1"
                    cursor
                  >
                    Дизайн
                    (<Plural
                      v-if="school.amount_courses.direction_design"
                      :number="school.amount_courses.direction_design"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_business"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.BUSINESS}`"
                    bck="blue1"
                    cursor
                  >
                    Бизнес и управление
                    (<Plural
                      v-if="school.amount_courses.direction_business"
                      :number="school.amount_courses.direction_business"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_analytics"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.ANALYTICS}`"
                    bck="blue1"
                    cursor
                  >
                    Аналитика
                    (<Plural
                      v-if="school.amount_courses.direction_analytics"
                      :number="school.amount_courses.direction_analytics"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_games"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.GAMES}`"
                    bck="blue1"
                    cursor
                  >
                    Игры
                    (<Plural
                      v-if="school.amount_courses.direction_games"
                      :number="school.amount_courses.direction_games"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                  <Tag
                    v-if="school.amount_courses.direction_other"
                    :to="`/courses/school/${school.link}?filters[direction]=${EDirection.OTHER}`"
                    bck="blue1"
                    cursor
                  >
                    Другие профессии
                    (<Plural
                      v-if="school.amount_courses.direction_other"
                      :number="school.amount_courses.direction_other"
                      :conditions="{ 1: 'курс', '2+': 'курса', '5+': 'курсов' }"
                    />)
                  </Tag>
                </Tags>
              </div>
              <div class="reviews__td reviews__td--rating">
                <div class="reviews__reviews">
                  <div class="reviews__content-rating">
                    <div class="reviews__rating">
                      <div class="reviews__rating-value">
                        {{ Math.round(school.rating * 100) / 100 }}
                      </div>
                      <div class="reviews__rating-star">
                        <Icon
                          name="star"
                          color="blue2"
                          :size="[30, 30]"
                          class="reviews__rating-star-icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="reviews__to-reviews">
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
import { storeToRefs } from 'pinia';
import {
  computed,
  ref,
  watch,
} from 'vue';
import {
  useRoute,
} from 'vue-router';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import SortDirection from '@/components/atoms/SortDirection.vue';
import Tag from '@/components/atoms/Tag.vue';
import Directions from '@/components/modules/reviews/organism/Directions.vue';
import Tags from '@/components/molecules/Tags.vue';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
import EDirection from '@/enums/direction';
import type ISort from '@/interfaces/sort';
import school from '@/stores/school';
import type { TOrder } from '@/types/order';
import type TSortOrder from '@/types/sortOrder';
import type IListSchoolReview from '~/interfaces/components/molecules/listSchoolReview';

const sortDefault: ISort = {
  sortBy: 'rating',
  sortOrder: 'DESC',
};
const route = useRoute();
const sortByCurrent = route.query.sortBy as string;
const sortOrderCurrent = route.query.sortOrder as string;

const sort = ref<ISort>({
  sortBy: sortByCurrent || sortDefault.sortBy,
  sortOrder: sortOrderCurrent as TOrder || sortDefault.sortOrder,
});
const { schools } = storeToRefs(school());
const direction = ref<EDirection | null>();

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
    items = items.filter((sch: IListSchoolReview) => {
      if (direction.value === EDirection.PROGRAMMING) {
        return !!sch.amount_courses.direction_programming;
      }

      if (direction.value === EDirection.MARKETING) {
        return !!sch.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.DESIGN) {
        return !!sch.amount_courses.direction_marketing;
      }

      if (direction.value === EDirection.BUSINESS) {
        return !!sch.amount_courses.direction_business;
      }

      if (direction.value === EDirection.ANALYTICS) {
        return !!sch.amount_courses.direction_analytics;
      }

      if (direction.value === EDirection.GAMES) {
        return !!sch.amount_courses.direction_games;
      }

      if (direction.value === EDirection.OTHER) {
        return !!sch.amount_courses.direction_other;
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/organism/reviews";
</style>
