<template>
  <div class="course-row">
    <nuxt-link
      :to="course.link"
      class="course-row__box"
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
        <CourseTileName
          :name="course.name"
        />
        <CourseRowText
          v-if="course.text"
          :text="course.text"
        />
      </div>
      <div class="course-row__side course-row__side--right">
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import CourseRowImage from '@/components/modules/catalog/atoms/CourseRowImage.vue';
import CourseRowText from '@/components/modules/catalog/atoms/CourseRowText.vue';
import CourseTileBrandLogo from '@/components/modules/catalog/atoms/CourseTileBrandLogo.vue';
import CourseTileName from '@/components/modules/catalog/atoms/CourseTileName.vue';
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
