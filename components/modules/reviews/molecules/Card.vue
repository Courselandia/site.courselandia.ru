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
            v-model:rating="ratingValue"
            :count="school.reviews_count"
            :count5="school.reviews_5_stars_count"
            :count4="school.reviews_4_stars_count"
            :count3="school.reviews_3_stars_count"
            :count2="school.reviews_2_stars_count"
            :count1="school.reviews_1_star_count"
          />
        </div>
        <div
          v-if="school.rating"
          class="card__rating"
        >
          <Rating
            :rating="school.rating"
          />
        </div>
      </div>
      <div class="card__row card__row--line">
        <div class="card__amounts">
          <AmountCourses
            :count="school.amount_courses.all"
          />
        </div>
      </div>
      <div class="card__row">
        <div class="card__actions">
          <Actions
            :link="school.link"
            :site="school.site || undefined"
            :name="school.name"
          />
        </div>
      </div>
      <div class="card__other-schools">
        <OtherSchools
          :school="school"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import AmountCourses from '@/components/modules/reviews/atoms/AmountCourses.vue';
import AmountReviews from '@/components/modules/reviews/atoms/AmountReviews.vue';
import Logo from '@/components/modules/reviews/atoms/Logo.vue';
import Rating from '@/components/modules/reviews/atoms/Rating.vue';
import Actions from '@/components/modules/reviews/molecules/Actions.vue';
import OtherSchools from '@/components/modules/reviews/molecules/OtherSchools.vue';
import Statistic from '@/components/modules/reviews/molecules/Statistic.vue';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';

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

const ratingValue = ref<number>(rating.value);

watch(ratingValue, () => {
  emit('update:rating', ratingValue.value);
});

watch(rating, () => {
  ratingValue.value = rating.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/card";
</style>
