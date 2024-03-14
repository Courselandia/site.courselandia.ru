<template>
  <div class="header-teacher-schools">
    <HeaderTeacherSchool
      v-for="(school, key) in schools"
      :key="key"
      :name="school.name"
      :link="school.link"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import HeaderTeacherSchool from '@/components/modules/catalog/atoms/HeaderTeacherSchool.vue';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';

const props = defineProps({
  schools: {
    type: Array as PropType<Array<ISchoolLink>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacherSchools";
</style>
