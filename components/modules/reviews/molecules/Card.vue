<template>
  <div
    :class="`card ${scroll ? 'card--scroll' : ''}`"
  >
    <div
      id="card"
      :class="`card__box ${scroll ? 'card__box--scroll' : ''}`"
    >
      <div class="card__row card__row--horizontal card__row--line">
        <div class="card__content-logo">
          <LazyImage
            v-if="school.image_logo_id"
            :src="school.image_logo_id.path"
            :alt="school.name"
            :title="school.name"
            class="card__logo"
          />
        </div>
        <div class="card__amount-review">
          <Icon
            name="message"
            :size="[26, 26]"
            color="black"
            class="card__amount-review-icon"
          />
          <div class="card__amount-review-label">
            <Plural
              v-if="school.reviews_count"
              :number="school.reviews_count"
              :conditions="conditions"
            />
          </div>
        </div>
      </div>
      <div class="card__row card__row--horizontal card__row--line">
        <div class="card__content-statistic">
          <div class="card__statistic">
            <div class="card__statistic-amount">
              5
            </div>
            <div class="card__statistic-item">
              <div
                v-if="ratingValue === 5 || !ratingValue"
                class="card__statistic-bar card__statistic-bar--full"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_5_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_5_stars_count}`"
                @click="onClickFilter(5)"
                @keyup="onClickFilter(5)"
              />
              <div
                v-else
                class="card__statistic-bar card__statistic-bar--empty"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_5_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_5_stars_count}`"
                @click="onClickFilter(5)"
                @keyup="onClickFilter(5)"
              />
            </div>
            <div class="card__statistic-cancel">
              <Icon
                v-if="ratingValue === 5"
                name="close"
                color="black"
                :size="[16, 16]"
                class="card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="card__statistic">
            <div class="card__statistic-amount">
              4
            </div>
            <div class="card__statistic-item">
              <div
                v-if="ratingValue === 4 || !ratingValue"
                class="card__statistic-bar card__statistic-bar--full"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_4_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_4_stars_count}`"
                @click="onClickFilter(4)"
                @keyup="onClickFilter(4)"
              />
              <div
                v-else
                class="card__statistic-bar card__statistic-bar--empty"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_4_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_4_stars_count}`"
                @click="onClickFilter(4)"
                @keyup="onClickFilter(4)"
              />
            </div>
            <div class="card__statistic-cancel">
              <Icon
                v-if="ratingValue === 4"
                name="close"
                color="black"
                :size="[16, 16]"
                class="card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="card__statistic">
            <div class="card__statistic-amount">
              3
            </div>
            <div class="card__statistic-item">
              <div
                v-if="ratingValue === 3 || !ratingValue"
                class="card__statistic-bar card__statistic-bar--full"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_3_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_3_stars_count}`"
                @click="onClickFilter(3)"
                @keyup="onClickFilter(3)"
              />
              <div
                v-else
                class="card__statistic-bar card__statistic-bar--empty"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_3_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_3_stars_count}`"
                @click="onClickFilter(3)"
                @keyup="onClickFilter(3)"
              />
            </div>
            <div class="card__statistic-cancel">
              <Icon
                v-if="ratingValue === 3"
                name="close"
                color="black"
                :size="[16, 16]"
                class="card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="card__statistic">
            <div class="card__statistic-amount">
              2
            </div>
            <div class="card__statistic-item">
              <div
                v-if="ratingValue === 2 || !ratingValue"
                class="card__statistic-bar card__statistic-bar--full"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_2_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_2_stars_count}`"
                @click="onClickFilter(2)"
                @keyup="onClickFilter(2)"
              />
              <div
                v-else
                class="card__statistic-bar card__statistic-bar--empty"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_2_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_2_stars_count}`"
                @click="onClickFilter(2)"
                @keyup="onClickFilter(2)"
              />
            </div>
            <div class="card__statistic-cancel">
              <Icon
                v-if="ratingValue === 2"
                name="close"
                color="black"
                :size="[16, 16]"
                class="card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="card__statistic">
            <div class="card__statistic-amount">
              1
            </div>
            <div class="card__statistic-item">
              <div
                v-if="ratingValue === 1 || !ratingValue"
                class="card__statistic-bar card__statistic-bar--full"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_1_star_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_1_star_count}`"
                @click="onClickFilter(1)"
                @keyup="onClickFilter(1)"
              />
              <div
                v-else
                class="card__statistic-bar card__statistic-bar--empty"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_1_star_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_1_star_count}`"
                @click="onClickFilter(1)"
                @keyup="onClickFilter(1)"
              />
            </div>
            <div
              class="card__statistic-cancel"
            >
              <Icon
                v-if="ratingValue === 1"
                name="close"
                color="black"
                :size="[16, 16]"
                class="card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
        </div>
        <div class="card__content-rating">
          <div class="card__content-rating-number">
            {{ Math.round(school.rating * 100) / 100 }}
          </div>
          <Icon
            class="card__content-rating-icon"
            name="star"
            :size="[32, 32]"
            color="blue2"
          />
        </div>
      </div>
      <div class="card__row card__row--line">
        <div class="card__block-statistics">
          <div class="card__block-statistic">
            <Icon
              name="video"
              :size="[24, 24]"
              color="black"
              class="card__block-statistic-icon"
            />
            <div class="card__block-statistic-label">
              Курсов: <b>{{ school.amount_courses.all }}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="card__row">
        <div class="card__actions">
          <div class="card__action">
            <Button
              :to="school.site as string"
              link="link"
              target="_blank"
              rel="nofollow noopener noreferrer"
              wide
            >
              Перейти на сайт
            </Button>
          </div>
          <div class="card__action">
            <Button
              :to="`/courses/school/${school.link}`"
              wide
              type="secondary"
            >
              Все курсы Skillbox
            </Button>
          </div>
        </div>
      </div>
      <div
        v-if="otherSchools?.length"
        class="card__others">
        <div class="card__others-label">
          Отзывы о других школах
        </div>
        <div class="card__others-schools">
          <div
            v-for="(otherSchool, index) in otherSchools"
            :key="index"
            class="card__others-school"
          >
            <div class="card__others-school-rating">
              {{ Math.round(school.rating * 100) / 100 }}
            </div>
            <div class="card__others-school-icon">
              <Icon
                name="star"
                :size="[22, 22]"
                color="blue2"
              />
            </div>
            <div class="card__others-school-name">
              {{ otherSchool.name }}
            </div>
            <div class="card__others-school-reviews">
              <nuxt-link
                :to="`/reviews/${otherSchool.link}`"
                class="link link--no-line"
              >
                {{ otherSchool.reviews_count }}
                {{ plural(otherSchool.reviews_count, conditions) }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import type {
  PropType,
} from 'vue';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import plural from '@/helpers/plural';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';
import type ISchool from '@/interfaces/stores/school/school';
import schoolStore from '@/stores/school';

const props = defineProps({
  rating: {
    type: Number,
    required: false,
    default: null,
  },
  school: {
    type: Object as PropType<ISchoolLink>,
    required: true,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const {
  rating,
} = toRefs(props);

const emit = defineEmits({
  'update:rating': (_: number | null) => true,
});

const ratingValue = ref<number | null>(rating.value);

watch(ratingValue, () => {
  emit('update:rating', ratingValue.value);
});

watch(rating, () => {
  ratingValue.value = rating.value;
});

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};

const sortSchools = (items: Array<ISchool> | null): Array<ISchool> | null => {
  if (items) {
    return items.sort((first: ISchool, second: ISchool) => {
      if (first.rating > second.rating) {
        return -1;
      }

      if (first.rating < second.rating) {
        return 1;
      }

      return 0;
    });
  }

  return null;
};

const { schools } = storeToRefs(schoolStore());
const otherSchools = ref<Array<ISchool> | null>(
  sortSchools(
    schools.value?.filter((item: ISchool) => !!item.reviews_count) || null,
  )?.slice(0, 4) || null,
);

const onClickFilter = (rtg: number): void => {
  if (rtg !== ratingValue.value) {
    ratingValue.value = rtg;
  } else {
    ratingValue.value = null;
  }
};

const getWidthStatsBar = (
  total: number,
  forParticularStars: number,
): number => Math.round((forParticularStars * 100) / total);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/card";
</style>
