<template>
  <div
    :class="`school-review-card ${scroll ? 'school-review-card--scroll' : ''}`"
  >
    <div
      id="school-review-card"
      :class="`school-review-card__box ${scroll ? 'school-review-card__box--scroll' : ''}`"
    >
      <div class="school-review-card__row school-review-card__row--horizontal school-review-card__row--line">
        <div class="school-review-card__content-logo">
          <LazyImage
            v-if="school.image_logo_id"
            :src="school.image_logo_id.pathCache"
            :alt="school.name"
            :title="school.name"
            class="school-review-card__logo"
          />
        </div>
        <div class="school-review-card__amount-review">
          <Icon
            name="message"
            :size="[26, 26]"
            color="black"
            class="school-review-card__amount-review-icon"
          />
          <div class="school-review-card__amount-review-label">
            <Plural
              v-if="school.reviews_count"
              :number="school.reviews_count"
              :conditions="conditions"
            />
          </div>
        </div>
      </div>
      <div class="school-review-card__row school-review-card__row--horizontal school-review-card__row--line">
        <div class="school-review-card__content-statistic">
          <div class="school-review-card__statistic">
            <div class="school-review-card__statistic-amount">
              5
            </div>
            <div class="school-review-card__statistic-item">
              <div
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 5 && ratingCurrent ? 'school-review-card__statistic-bar--empty' : ''}`"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_5_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_5_stars_count}`"
                @click="onClickFilter(5)"
                @keyup="onClickFilter(5)"
              />
            </div>
            <div class="school-review-card__statistic-cancel">
              <Icon
                v-if="ratingCurrent === 5"
                name="close"
                color="black"
                :size="[16, 16]"
                class="school-review-card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="school-review-card__statistic">
            <div class="school-review-card__statistic-amount">
              4
            </div>
            <div class="school-review-card__statistic-item">
              <div
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 4 && ratingCurrent ? 'school-review-card__statistic-bar--empty' : ''}`"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_4_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_4_stars_count}`"
                @click="onClickFilter(4)"
                @keyup="onClickFilter(4)"
              />
            </div>
            <div class="school-review-card__statistic-cancel">
              <Icon
                v-if="ratingCurrent === 4"
                name="close"
                color="black"
                :size="[16, 16]"
                class="school-review-card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="school-review-card__statistic">
            <div class="school-review-card__statistic-amount">
              3
            </div>
            <div class="school-review-card__statistic-item">
              <div
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 3 && ratingCurrent ? 'school-review-card__statistic-bar--empty' : ''}`"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_3_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_3_stars_count}`"
                @click="onClickFilter(3)"
                @keyup="onClickFilter(3)"
              />
            </div>
            <div class="school-review-card__statistic-cancel">
              <Icon
                v-if="ratingCurrent === 3"
                name="close"
                color="black"
                :size="[16, 16]"
                class="school-review-card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="school-review-card__statistic">
            <div class="school-review-card__statistic-amount">
              2
            </div>
            <div class="school-review-card__statistic-item">
              <div
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 2 && ratingCurrent ? 'school-review-card__statistic-bar--empty' : ''}`"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_2_stars_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_2_stars_count}`"
                @click="onClickFilter(2)"
                @keyup="onClickFilter(2)"
              />
            </div>
            <div class="school-review-card__statistic-cancel">
              <Icon
                v-if="ratingCurrent === 2"
                name="close"
                color="black"
                :size="[16, 16]"
                class="school-review-card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
          <div class="school-review-card__statistic">
            <div class="school-review-card__statistic-amount">
              1
            </div>
            <div class="school-review-card__statistic-item">
              <div
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 1 && ratingCurrent ? 'school-review-card__statistic-bar--empty' : ''}`"
                :style="{ width: getWidthStatsBar(school.reviews_count, school.reviews_1_star_count) + 'px' }"
                :title="`Отзывов: ${school.reviews_1_star_count}`"
                @click="onClickFilter(1)"
                @keyup="onClickFilter(1)"
              />
            </div>
            <div
              class="school-review-card__statistic-cancel"
            >
              <Icon
                v-if="ratingCurrent === 1"
                name="close"
                color="black"
                :size="[16, 16]"
                class="school-review-card__statistic-cancel-icon"
                @click="onClickCancelFilter"
              />
            </div>
          </div>
        </div>
        <div class="school-review-card__content-rating">
          <div class="school-review-card__content-rating-number">
            {{ school.rating }}
          </div>
          <Icon
            class="school-review-card__content-rating-icon"
            name="star"
            :size="[32, 32]"
            color="blue2"
          />
        </div>
      </div>
      <div class="school-review-card__row school-review-card__row--line">
        <div class="school-review-card__block-statistics">
          <div class="school-review-card__block-statistic">
            <Icon
              name="video"
              :size="[24, 24]"
              color="black"
              class="school-review-card__block-statistic-icon"
            />
            <div class="school-review-card__block-statistic-label">
              Курсов: <b>{{ school.amount_courses.all }}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="school-review-card__row">
        <div class="school-review-card__actions">
          <div class="school-review-card__action">
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
          <div class="school-review-card__action">
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
      <div class="school-review-card__others">
        <div class="school-review-card__others-label">
          Отзывы о других школах
        </div>
        <div class="school-review-card__others-schools">
          <div
            v-for="(otherSchool, index) in otherSchools"
            :key="index"
            class="school-review-card__others-school"
          >
            <div class="school-review-card__others-school-rating">
              {{ otherSchool.rating }}
            </div>
            <div class="school-review-card__others-school-icon">
              <Icon
                name="star"
                :size="[22, 22]"
                color="blue2"
              />
            </div>
            <div class="school-review-card__others-school-name">
              {{ otherSchool.name }}
            </div>
            <div class="school-review-card__others-school-reviews">
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
import { PropType, ref, toRefs } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import plural from '@/helpers/plural';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';
import ISchool from '@/interfaces/stores/school/school';

const props = defineProps({
  school: {
    type: Object as PropType<ISchoolLink>,
    required: true,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: true,
  },
  rating: {
    type: Number,
    required: false,
    default: null,
  },
});

const {
  rating,
} = toRefs(props);

const emit = defineEmits({
  filter: (_: number | null) => true,
});

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};

const sortSchools = (schools: Array<ISchool>): Array<ISchool> => {
  const result = schools.sort((first: ISchool, second: ISchool) => {
    if (first.rating > second.rating) {
      return -1;
    }

    if (first.rating < second.rating) {
      return 1;
    }

    return 0;
  });

  return result;
};

const otherSchools = ref<Array<ISchool>>();

try {
  const fetchedOtherSchools = await $fetch('/api/school/read');
  otherSchools.value = sortSchools(
    fetchedOtherSchools.filter((school: ISchool) => !!school.reviews_count),
  ).slice(0, 4);
} catch (error: any) {
  console.error(error.message);
}

const ratingCurrent = ref<number | null>(rating.value);

const onClickFilter = (rtg: number): void => {
  if (rtg !== ratingCurrent.value) {
    ratingCurrent.value = rtg;
  } else {
    ratingCurrent.value = null;
  }

  emit('filter', ratingCurrent.value);
};

const onClickCancelFilter = (): void => {
  ratingCurrent.value = null;
  emit('filter', null);
};

const getWidthStatsBar = (
  total: number,
  forParticularStars: number,
): number => Math.round((forParticularStars * 100) / total);
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/schoolReviewCard.scss";
</style>
