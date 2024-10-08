<template>
  <div class="course-tile">
    <nuxt-link
      :to="course.link"
      class="course-tile__box"
      prefetch
      @mousedown="onClickActive"
      @mouseup="onClickDisable"
      @mouseleave="onClickDisable"
      @focusout="onClickDisable"
    >
      <div class="course-tile__image">
        <CourseTileImage
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
        </CourseTileImage>
      </div>
      <div class="course-tile__content">
        <CourseTileName
          :name="course.name"
        />
        <div class="course-tile__info">
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
        <CourseTilePrices
          :price="course.price || undefined"
          :price-recurrent="course.price_recurrent || undefined"
          :price-old="course.price_old || undefined"
          :currency="course.currency || undefined"
        />
        <div class="course-tile__promocode">
          <CoursePromocode
            v-if="course.price || course.price_recurrent || course.price_old"
            :course="course"
          />
        </div>
      </div>
    </nuxt-link>
    <div class="course-tile__footer">
      <CourseTitleButtonGo
        v-model:active="activeValue"
        :url="course.url"
      />
      <CourseTitleFavorite
        :id="course.id"
      />
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

import CourseTileBrandLogo from '@/components/modules/catalog/atoms/CourseTileBrandLogo.vue';
import CourseTileDuration from '@/components/modules/catalog/atoms/CourseTileDuration.vue';
import CourseTileImage from '@/components/modules/catalog/atoms/CourseTileImage.vue';
import CourseTileLessonsAmount from '@/components/modules/catalog/atoms/CourseTileLessonsAmount.vue';
import CourseTileName from '@/components/modules/catalog/atoms/CourseTileName.vue';
import CourseTilePrices from '@/components/modules/catalog/atoms/CourseTilePrices.vue';
import CourseTileRating from '@/components/modules/catalog/atoms/CourseTileRating.vue';
import CourseTitleButtonGo from '@/components/modules/catalog/atoms/CourseTitleButtonGo.vue';
import CourseTitleFavorite from '@/components/modules/catalog/atoms/CourseTitleFavorite.vue';
import CoursePromocode from '@/components/modules/catalog/molecules/CoursePromocode.vue';
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
  'update:active': (_: boolean) => true,
});

const {
  active,
} = toRefs(props);

const activeValue = ref<boolean>(active.value);

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
@import "@/assets/scss/components/modules/catalog/molecules/courseTile";
</style>
