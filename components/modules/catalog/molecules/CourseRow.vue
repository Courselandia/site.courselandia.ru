<template>
  <div class="course-row">
    <div class="course-row__box">
      <nuxt-link
        :to="course.link"
        class="course-row__link"
        @mousedown="onClickActive"
        @mouseup="onClickDisable"
        @mouseleave="onClickDisable"
        @focusout="onClickDisable"
      >
        <div class="course-row__side course-row__side--left">
          <CourseRowImage
            :path="course.image?.path"
          >
            <CourseTileRating
              v-if="course.rating"
              :rating="course.rating"
            />
            <CourseTileBrandLogo
              v-if="course.school?.image"
              :path="course.school.image"
              :name="course.school.name"
            />
          </CourseRowImage>
        </div>
        <div class="course-row__side course-row__side--center">
          <div class="course-row__top">
            <div class="course-row__rating-and-logo-mobile">
              <CourseTileBrandLogo
                path="https://api.courselandia.ru/storage/images/schools/6410c538e36d31d8df053d44.webp?1678820664"
                :name="course.school.name"
              />
              <CourseTileRating
                v-if="course.rating"
                :rating="course.rating"
              />
            </div>
            <CourseTileName
              :name="course.name"
            />
          </div>
          <div class="course-row__middle">
            <CourseRowText
              v-if="course.text"
              :text="course.text"
            />
          </div>
          <div class="course-row__bottom">
            <CourseTileDuration
              v-if="course.duration && course.duration_unit"
              :duration="course.duration"
              :unit="course.duration_unit"
              :point="!!course.lessons_amount"
            />
            <CourseTileLessonsAmount
              v-if="course.lessons_amount"
              :amount="course.lessons_amount"
            />
          </div>
        </div>
      </nuxt-link>
      <div class="course-row__side course-row__side--right">
        <CourseTilePrices
          :price="course.price"
          :price-recurrent="course.price_recurrent"
          :price-old="course.price_old"
          :currency="course.currency"
        />
        <div class="course-row__actions">
          <CourseRowButtonGo
            v-model:active="activeValue"
            :url="course.url"
          />
          <CourseRowFavorite
            :id="course.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import CourseRowButtonGo from '@/components/modules/catalog/atoms/CourseRowButtonGo.vue';
import CourseRowFavorite from '@/components/modules/catalog/atoms/CourseRowFavorite.vue';
import CourseRowImage from '@/components/modules/catalog/atoms/CourseRowImage.vue';
import CourseRowText from '@/components/modules/catalog/atoms/CourseRowText.vue';
import CourseTileBrandLogo from '@/components/modules/catalog/atoms/CourseTileBrandLogo.vue';
import CourseTileDuration from '@/components/modules/catalog/atoms/CourseTileDuration.vue';
import CourseTileLessonsAmount from '@/components/modules/catalog/atoms/CourseTileLessonsAmount.vue';
import CourseTileName from '@/components/modules/catalog/atoms/CourseTileName.vue';
import CourseTilePrices from '@/components/modules/catalog/atoms/CourseTilePrices.vue';
import CourseTileRating from '@/components/modules/catalog/atoms/CourseTileRating.vue';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits({
  'update:active': (_: Boolean) => true,
});

const {
  active,
} = toRefs(props);

const activeValue = ref<Boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});

const onClickActive = (): void => {
  activeValue.value = true;
};

const onClickDisable = (): void => {
  activeValue.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courseRow";
</style>
