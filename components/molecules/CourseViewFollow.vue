<template>
  <div class="course-view-follow">
    <div class="course-view-follow__box">
      <div class="course-view-follow__content content">
        <div class="course-view-follow__side course-view-follow__side--left">
          <div class="course-view-follow__name">
            {{ course.name }}
          </div>
          <div class="course-view-follow__prices">
            <div
              v-if="course.price || course.price_recurrent"
              class="course-view-follow__price"
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
              class="course-view-follow__price_additional"
            >
              <div
                v-if="course.price_recurrent && course.price"
                class="course-view-follow__price_current"
              >
                {{ money(course.price) }} {{ currency(course.currency) }}
              </div>
              <div
                v-if="course.price_old"
                class="course-view-follow__price_old"
              >
                {{ money(course.price_old) }} {{ currency(course.currency) }}
              </div>
            </div>
            <div
              v-if="!course.price && !course.price_recurrent && !course.price_old"
              class="course-view-follow__price"
            >
              Бесплатно
            </div>
          </div>
        </div>
        <div class="course-view-follow__side course-view-follow__side--right">
          <div class="course-view-follow__action course-view-follow__action--button">
            <Button
              :to="course.url"
              link="link"
              target="_blank"
              rel="nofollow noopener noreferrer"
              @click="onClick"
            >
              Перейти
            </Button>
          </div>
          <div class="course-view-follow__action course-view-follow__action--favorite">
            <FavoriteCourse
              :id="course.id"
              :mobile="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Button from '@/components/atoms/Button.vue';
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
import currency from '@/helpers/currency';
import { money } from '@/helpers/number';
import track from '@/helpers/track';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const onClick = (): void => {
  track('school');
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewFollow.scss";
</style>
