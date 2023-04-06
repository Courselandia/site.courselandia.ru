<template>
  <div
    :class="`course-view-card ${props.scroll ? 'course-view-card--scroll' : ''}`"
  >
    <div
      id="course-view-card"
      :class="`course-view-card__box ${props.scroll ? 'course-view-card__box--scroll' : ''}`"
    >
      <div class="course-view-card__image" :style="`background-image: url('${course.image ? course.image : holder?.default}')`">
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
            v-if="course.price || course.price_recurrent"
            class="course-view-card__price"
          >
            {{ course.price_recurrent
              ? money(course.price_recurrent)
              : money(course.price)
            }}
            {{ currency(course.currency) }}
            <template v-if="course.price_recurrent">
              в месяц
            </template>
          </div>
          <div
            v-if="(course.price_recurrent && course.price) || course.price_old"
            class="course-view-card__price_additional"
          >
            <div
              v-if="course.price_recurrent && course.price"
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
          <div
            v-if="!course.price && !course.price_recurrent && !course.price_old"
            class="course-view-card__price"
          >
            Бесплатно
          </div>
        </div>
      </div>
      <div class="course-view-card__footer">
        <div class="course-view-card__actions">
          <div class="course-view-card__action course-view-card__action--button">
            <Button
              :to="course.url"
              link="link"
              target="_blank"
              rel="nofollow noopener noreferrer"
              wide
              @click="onClick"
            >
              На сайт курса
            </Button>
          </div>
          <div class="course-view-card__action course-view-card__action--favorite">
            <FavoriteCourse
              :id="course.id"
            />
          </div>
        </div>
        <div
          v-if="course.features?.length"
          class="course-view-card__feature"
        >
          <div class="course-view-card__feature-header">
            <div class="course-view-card__feature-header-label">
              Кратко о курсе
            </div>
            <div class="course-view-card__feature-header-line" />
          </div>
          <div class="course-view-card__feature-items">
            <div
              v-for="(feature, key) in course.features"
              :key="key"
              class="course-view-card__feature-item"
            >
              <div class="course-view-card__feature-icon">
                <Icon
                  :name="feature.icon"
                  color="black"
                  :size="[22, 22]"
                />
              </div>
              <div class="course-view-card__feature-value">
                {{ feature.text }}
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
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import track from '@/helpers/track';
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

const holder = await import('@/assets/images/holder.svg');

const nameClass = computed(() => {
  const classes = [];

  if (props.scroll) {
    classes.push('course-view-card--scroll');
  }

  return classes.join(' ');
});

const onClick = (): void => {
  track('school');
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewCard.scss";
</style>
