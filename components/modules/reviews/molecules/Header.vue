<template>
  <div class="header">
    <div class="header__side header__side--left">
      <h1 class="title title--1">
        Отзывы о школе {{ school.name }}
      </h1>

      <Reducer
        v-if="school.text"
        class="header__description"
      >
        <span
          v-html="school.text"
        />
      </Reducer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Reducer from '@/components/atoms/Reducer.vue';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';

const props = defineProps({
  school: {
    type: Object as PropType<ISchoolLink>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviews/molecules/header";
</style>
