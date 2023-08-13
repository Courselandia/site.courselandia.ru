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
              :conditions="{ 1: 'отзыв', '2+': 'отзыва', '5+': 'отзывов' }"
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
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 5 && ratingCurrent !== null ? 'school-review-card__statistic-bar--empty' : ''}`"
                style="width: 50%"
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
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 4 && ratingCurrent !== null ? 'school-review-card__statistic-bar--empty' : ''}`"
                style="width: 30%"
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
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 3 && ratingCurrent !== null ? 'school-review-card__statistic-bar--empty' : ''}`"
                style="width: 20%"
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
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 2 && ratingCurrent !== null ? 'school-review-card__statistic-bar--empty' : ''}`"
                style="width: 10%"
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
                :class="`school-review-card__statistic-bar ${ratingCurrent !== 1 && ratingCurrent !== null ? 'school-review-card__statistic-bar--empty' : ''}`"
                style="width: 70%"
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
          HERE
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import Plural from '@/components/atoms/Plural.vue';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';

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
});

const emit = defineEmits({
  filter: (_: number | null) => true,
});

const ratingCurrent = ref<number | null>(null);

const onClickFilter = (rating: number): void => {
  if (rating !== ratingCurrent.value) {
    ratingCurrent.value = rating;
  } else {
    ratingCurrent.value = null;
  }

  emit('filter', ratingCurrent.value);
};

const onClickCancelFilter = (): void => {
  ratingCurrent.value = null;
  emit('filter', null);
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/schoolReviewCard.scss";
</style>
