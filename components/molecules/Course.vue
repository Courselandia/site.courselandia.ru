<template>
  <div class="course">
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

    </div>
    <div class="course__footer">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
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