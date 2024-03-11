<template>
  <div
    :class="`card ${props.scroll ? 'card--scroll' : ''}`"
  >
    <div
      id="card"
      :class="`card__box ${props.scroll ? 'card__box--scroll' : ''}`"
    >
      <div class="card__image" :style="`background-image: url('${course.image ? course.image.path : holder?.default}')`">
        <div
          v-if="course.rating"
          class="card__rating"
        >
          <div class="card__rating_star">
            <Icon
              name="star"
              color="blue2"
              :size="[16, 16]"
            />
          </div>
          <div class="card__rating_amount">
            {{ course.rating }}
          </div>
        </div>
        <div
          v-if="course.school?.image"
          class="card__brand"
        >
          <LazyImage
            :src="course.school.image"
            class="card__logo"
            :alt="course.school.name"
            :title="course.school.name"
          />
        </div>
      </div>
      <div class="card__content">
        <div class="card__name">
          {{ course.name }}
        </div>

        <div class="card__prices">
          <div
            v-if="course.price || course.price_recurrent"
            class="card__price"
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
            class="card__price_additional"
          >
            <div
              v-if="course.price_recurrent && course.price"
              class="card__price_current"
            >
              {{ money(course.price) }} {{ currency(course.currency) }}
            </div>
            <div
              v-if="course.price_old"
              class="card__price_old"
            >
              {{ money(course.price_old) }} {{ currency(course.currency) }}
            </div>
          </div>
          <div
            v-if="!course.price && !course.price_recurrent && !course.price_old"
            class="card__price"
          >
            Бесплатно
          </div>
        </div>
      </div>
      <div class="card__footer">
        <div class="card__actions">
          <div class="card__action card__action--button">
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
          <div class="card__action card__action--favorite">
            <FavoriteCourse
              :id="course.id"
            />
          </div>
        </div>
        <div
          v-if="course.features?.length"
          class="card__feature"
        >
          <div class="card__feature-header">
            <div class="card__feature-header-label">
              Кратко о курсе
            </div>
            <div class="card__feature-header-line" />
          </div>
          <div class="card__feature-items">
            <div
              v-for="(feature, key) in course.features"
              :key="key"
              class="card__feature-item"
            >
              <div class="card__feature-icon">
                <Icon
                  :name="feature.icon as TIcon"
                  color="black"
                  :size="[22, 22]"
                />
              </div>
              <div class="card__feature-value">
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
import type {
  PropType,
} from 'vue';
import {
  computed,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import track from '@/helpers/track';
import type ICourse from '@/interfaces/components/molecules/course';
import type TIcon from '@/types/icon';

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

const holder = await import('assets/images/holder.svg');

const nameClass = computed(() => {
  const classes = [];

  if (props.scroll) {
    classes.push('card--scroll');
  }

  return classes.join(' ');
});

const onClick = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/card";
</style>
