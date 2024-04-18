<template>
  <div
    v-if="course.program"
    class="program"
  >
    <h2 class="title title--1 program--title">
      Программа курса
    </h2>

    <div
      v-if="description"
      class="program__top"
    >
      <ProgramInfo
        :description="description"
        :modules-amount="course.modules_amount || undefined"
        :lessons-amount="course.lessons_amount || undefined"
      />
    </div>

    <div class="program__bottom">
      <ProgramList
        :program="course.program"
      />
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

import ProgramInfo from '@/components/modules/course/molecules/ProgramInfo.vue';
import ProgramList from '@/components/modules/course/molecules/ProgramList.vue';
import type ICourse from '@/interfaces/components/modules/course';
import programDescription from '@/lib/programDescription';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});

const description = computed(() => programDescription(props.course));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/program";
</style>
