<template>
  <div class="course">
    <nuxt-link
      :to="`/courses/show/${course.link}`"
      class="course__box"
    >
      <div class="course__image" :style="`background-image: url('${course.image}')`">
        <div
          v-if="course.rating"
          class="course__rating"
        >
          <div class="course__rating_star">
            <Icon
              name="star"
              color="blue2"
              :size="[16, 16]"
            />
          </div>
          <div class="course__rating_amount">
            {{ course.rating }}
          </div>
        </div>
        <div
          v-if="course.school.image"
          class="course__brand"
        >
          <LazyImage
            :src="course.school.image"
            class="course__logo"
            :alt="course.school.name"
            :title="course.school.name"
          />
        </div>
      </div>
      <div class="course__content">
        <div class="course__name">
          {{ course.name }}
        </div>
        <div class="course__info">
          <div
            v-if="course.duration"
            class="course__duration"
          >
            {{ duration(course.duration, course.duration_unit) }}
          </div>
          <div
            v-if="course.lessons_amount"
            class="course__lessons_amount"
          >
            {{ course.lessons_amount }}
            <template v-if="course.lessons_amount === 1">
              урок
            </template>
            <template v-else-if="course.lessons_amount >= 2 && course.lessons_amount <= 4">
              урока
            </template>
            <template v-else-if="course.lessons_amount >= 5">
              уроков
            </template>
          </div>
        </div>
        <div class="course__prices">
          <div
            v-if="course.price || course.price_recurrent_price"
            class="course__price"
          >
            {{ course.price_recurrent_price
              ? money(course.price_recurrent_price)
              : money(course.price)
            }}
            {{ currency(course.currency) }}
            <template v-if="course.price_recurrent_price">
              в месяц
            </template>
          </div>
          <div
            v-if="(course.price_recurrent_price && course.price) || course.price_old"
            class="course__price_additional"
          >
            <div
              v-if="course.price_recurrent_price && course.price"
              class="course__price_current"
            >
              {{ money(course.price) }} {{ currency(course.currency) }}
            </div>
            <div
              v-if="course.price_old"
              class="course__price_old"
            >
              {{ money(course.price_old) }} {{ currency(course.currency) }}
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
    <div class="course__footer">
      <a
        :href="course.url"
        target="_blank"
        rel="noopener noreferrer"
        class="course__link"
      >
        Перейти на сайт
      </a>
      <div class="course__favorite">
        <div class="course__heart">
          <div class="course__heart_to_center">
            <FavoriteCourse id="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
import currency from '@/helpers/currency';
import duration from '@/helpers/duration';
import { money } from '@/helpers/number';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/course.scss";
</style>
