<template>
  <div class="course-box-tools">
    <div
      v-for="(tool, key) in course.tools"
      :key="key"
      class="course-box-tools__item"
    >
      <nuxt-link
        :to="tool.link"
        class="link"
      >
        {{ tool.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courseBoxTools";
</style>
