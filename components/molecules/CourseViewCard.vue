<template>
  <div
    :class="`course-view-card ${props.scroll ? 'course-view-card--scroll' : ''}`"
  >
    <div
      :class="`course-view-card__box ${props.scroll ? 'course-view-card__box--scroll' : ''}`"
    >
      <div class="course-view-card__image" :style="`background-image: url('${course.image}')`">
        <div
          v-if="course.rating"
          class="course-view-card__rating"
        >
          <div class="course-view-card__rating_star">
            <Icon
              name="star"
              color="blue2"
              :size="[16, 16]"
            />
          </div>
          <div class="course-view-card__rating_amount">
            {{ course.rating }}
          </div>
        </div>
        <div
          v-if="course.school.image"
          class="course-view-card__brand"
        >
          <LazyImage
            :src="course.school.image"
            class="course-view-card__logo"
            :alt="course.school.name"
            :title="course.school.name"
          />
        </div>
      </div>
      <div class="course-view-card__content">
        <div class="course-view-card__name">
          {{ course.name }}
        </div>

        <div class="course-view-card__prices">
          <div
            v-if="course.price || course.price_recurrent_price"
            class="course-view-card__price"
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
            class="course-view-card__price_additional"
          >
            <div
              v-if="course.price_recurrent_price && course.price"
              class="course-view-card__price_current"
            >
              {{ money(course.price) }} {{ currency(course.currency) }}
            </div>
            <div
              v-if="course.price_old"
              class="course-view-card__price_old"
            >
              {{ money(course.price_old) }} {{ currency(course.currency) }}
            </div>
          </div>
        </div>
      </div>
      <div class="course-view-card__footer">
        <div class="course-view-card__action">
          <Button
            to="https://ya.ru/"
            link="link"
            target="_blank"
            rel="nofollow"
            wide
          >
            На сайт курса
          </Button>
        </div>
        <div class="course-view-card__feature">
          <div class="course-view-card__feature-header">
            <div class="course-view-card__feature-header-label">
              Кратко о курсе
            </div>
            <div class="course-view-card__feature-header-line" />
          </div>
          <div class="course-view-card__feature-items">
            <div class="course-view-card__feature-item">
              <div class="course-view-card__feature-icon">
                <Icon
                  name="video"
                  color="black"
                  :size="[22, 22]"
                />
              </div>
              <div class="course-view-card__feature-value">
                79 онлайн-уроков
              </div>
            </div>
            <div class="course-view-card__feature-item">
              <div class="course-view-card__feature-icon">
                <Icon
                  name="certificate"
                  color="black"
                  :size="[22, 22]"
                />
              </div>
              <div class="course-view-card__feature-value">
                Сертификат о прохождении курса
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
  scroll: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const nameClass = computed(() => {
  const classes = [];

  if (props.scroll) {
    classes.push('course-view-card--scroll');
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewCard.scss";
</style>
