<template>
  <div class="header-teacher-experiences">
    <div class="header-teacher-experiences__label">
      Опыт работы
    </div>

    <div class="header-teacher-experiences__items">
      <HeaderTeacherExperience
        v-for="(experience, key) in experiences"
        :key="key"
        :experience="experience"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';

import HeaderTeacherExperience from '@/components/modules/catalog/atoms/HeaderTeacherExperience.vue';
import type ITeacherExperience from '@/interfaces/stores/course/teacherExperience';

const props = defineProps({
  experiences: {
    type: Array as PropType<Array<ITeacherExperience>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacherExperiences";
</style>
