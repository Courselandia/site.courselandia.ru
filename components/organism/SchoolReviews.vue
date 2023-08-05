<template>
  <div class="school-reviews">
    <div class="school-reviews__items">
      <div class="school-reviews__header">
        <div class="school-reviews__th school-reviews__th--school">
          Школа
        </div>
        <div class="school-reviews__th school-reviews__th--description">
          Описание
        </div>
        <div class="school-reviews__th school-reviews__th--courses">
          Курсы
        </div>
        <div class="school-reviews__th school-reviews__th--rating">
          Рейтинг
        </div>
      </div>
      <div class="school-reviews__body">
        <div
          v-for="(school, key) in listSchoolReviews"
          :key="key"
          class="school-reviews__item"
        >
          <div class="school-reviews__td school-reviews__td--school">
            <LazyImage
              v-if="school.image"
              :src="school.image"
              :alt="school.label"
              :title="school.label"
              class="school-reviews__logo"
            />
            <template
              v-else
            >
              {{ school.label }}
            </template>
          </div>
          <div
            class="school-reviews__td school-reviews__td--description"
          >
            <div
              class="school-reviews__text"
              v-html="school.text"
            />
            <a
              v-if="school.site"
              :href="school.site"
              class="link school-reviews__site"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ school.site.replace(/^https?:\/\//, '') }}
            </a>
          </div>
          <div class="school-reviews__td school-reviews__td--courses">
            Курсы
          </div>
          <div class="school-reviews__td school-reviews__td--rating">
            <div class="school-reviews__reviews">
              <div class="school-reviews__rating">
                <div class="school-reviews__rating-value">
                  {{ school.rating }}
                </div>
                <div class="school-reviews__rating-star">
                  <Icon
                    name="star"
                    color="blue2"
                    :size="[30, 30]"
                    class="school-reviews__rating-star-icon"
                  />
                </div>
              </div>
              <div class="school-reviews__to-reviews">
                <Button
                  to=""
                >
                  {{ school.reviews }}
                  <template v-if="school.reviews === 0 || school.reviews >= 5">
                    отзывов
                  </template>
                  <template v-else-if="school.reviews === 1">
                    отзыв
                  </template>
                  <template v-else-if="school.reviews >= 2 || school.reviews >= 4">
                    отзыва
                  </template>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';

const listSchoolReviews = ref<IListSchoolReview[]>();

try {
  const schools = await $fetch('/api/school/read');
  listSchoolReviews.value = schoolsToSchoolReviews(schools);
} catch (error: any) {
  console.error(error.message);
}
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/schoolReviews.scss";
</style>
