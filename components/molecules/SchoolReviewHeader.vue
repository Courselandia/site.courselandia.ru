<template>
  <div class="school-review-header">
    <div class="school-review-header__side school-review-header__side--left">
      <h1 class="title title--1">
        Отзывы о школе {{ school.name }}
      </h1>

      <Reducer
        v-if="school.text"
        class="school-review-header__description"
      >
        <span
          v-html="school.text"
        />
      </Reducer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Reducer from '@/components/atoms/Reducer.vue';
import ISchoolLink from '@/interfaces/stores/course/schoolLink';

const props = defineProps({
  school: {
    type: Object as PropType<ISchoolLink>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/schoolReviewHeader.scss";
</style>
