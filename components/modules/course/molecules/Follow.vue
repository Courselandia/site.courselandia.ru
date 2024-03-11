<template>
  <div class="follow">
    <div class="follow__box">
      <div class="follow__content content">
        <div class="follow__side follow__side--left">
          <div class="follow__name">
            {{ course.name }}
          </div>
          <div class="follow__prices">
            <div
              v-if="course.price || course.price_recurrent"
              class="follow__price"
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
              class="follow__price_additional"
            >
              <div
                v-if="course.price_recurrent && course.price"
                class="follow__price_current"
              >
                {{ money(course.price) }} {{ currency(course.currency) }}
              </div>
              <div
                v-if="course.price_old"
                class="follow__price_old"
              >
                {{ money(course.price_old) }} {{ currency(course.currency) }}
              </div>
            </div>
            <div
              v-if="!course.price && !course.price_recurrent && !course.price_old"
              class="follow__price"
            >
              Бесплатно
            </div>
          </div>
        </div>
        <div class="follow__side follow__side--right">
          <div class="follow__action follow__action--button">
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
          <div class="follow__action follow__action--favorite">
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

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/follow";
</style>
