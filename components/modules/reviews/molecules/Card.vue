<template>
  <div
    :class="`card ${scroll ? 'card--scroll' : ''}`"
  >
    <div
      id="school-reviews-card"
      :class="`card__box ${scroll ? 'card__box--scroll' : ''}`"
    >
      <div class="card__row card__row--horizontal card__row--line">
        <div class="card__logo">
          <Logo
            v-if="school.image_logo_id?.path"
            :path="school.image_logo_id.path"
            :name="school.name"
          />
        </div>
        <div class="card__amount-review">
          <AmountReviews
            :count="school.reviews_count"
          />
        </div>
      </div>
      <div class="card__row card__row--horizontal card__row--line">
        <div class="card__statistic">
          <Statistic
            :rating="ratingValue"
            :count="school.reviews_count"
            :count5="school.reviews_5_stars_count"
            :count4="school.reviews_4_stars_count"
            :count3="school.reviews_3_stars_count"
            :count2="school.reviews_2_stars_count"
            :count1="school.reviews_1_star_count"
          />
        </div>
        <div class="card__rating">
          <Rating
            :rating="school.rating"
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
        class="card__others"
      >
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
import AmountReviews from '@/components/modules/reviews/atoms/AmountReviews.vue';
import Logo from '@/components/modules/reviews/atoms/Logo.vue';
import Rating from '@/components/modules/reviews/atoms/Rating.vue';
import Statistic from '@/components/modules/reviews/molecules/Statistic.vue';
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/card";
</style>
