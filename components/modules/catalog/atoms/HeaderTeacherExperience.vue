<template>
  <div class="header-teacher-experience">
    <div
      v-if="experience.place"
      class="header-teacher-experience__place"
    >
      {{ experience.place }}
    </div>
    <div
      v-if="experience.position"
      class="header-teacher-experience__position"
    >
      {{ experience.position }}
    </div>
    <div
      v-if="experience.started || experience.finished"
      class="header-teacher-experience__period"
    >
      <template
        v-if="experience.started"
      >
        {{ dayjs.utc(experience.started).format('DD.MM.YYYY') }}
      </template>
      <template
        v-if="experience.started && experience.finished"
      >
        –
      </template>
      <template
        v-if="experience.finished"
      >
        {{ dayjs.utc(experience.finished).format('DD.MM.YYYY') }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import type { PropType } from 'vue';

import type ITeacherExperience from '@/interfaces/stores/course/teacherExperience';

defineProps({
  experience: {
    type: Object as PropType<ITeacherExperience>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherExperience";
</style>
