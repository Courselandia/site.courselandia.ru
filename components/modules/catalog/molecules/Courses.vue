<template>
  <div :class="`courses ${nameClass}`">
    <template
      v-if="courses?.length"
    >
      <Course
        v-for="(course, key) in courses"
        :key="key"
        :course="course"
        :type="type"
      />
    </template>
    <div
      v-else-if="hasSlot('empty')"
      class="courses__no-result"
    >
      <slot name="empty" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ListItem } from 'schema-dts';
import type {
  PropType,
} from 'vue';
import {
  computed,
  toRefs,
  useSlots,
} from 'vue';

import Course from '@/components/modules/catalog/molecules/Course.vue';
import ECourseType from '@/enums/components/modules/catalog/courseType';
import type ICourse from '@/interfaces/components/modules/course';

const props = defineProps({
  courses: {
    type: Array as PropType<Array<ICourse>>,
    required: true,
  },
  columns: {
    type: Number,
    required: false,
    default: 4,
  },
  type: {
    type: String as PropType<ECourseType>,
    required: false,
    default: ECourseType.TILE,
  },
});

const config = useRuntimeConfig();
const { courses } = toRefs(props);
const slots = useSlots();
const hasSlot = (name: string) => !!slots[name];

const nameClass = computed(() => {
  const classes = [];

  if (props.columns && props.courses?.length) {
    classes.push(`courses--columns-${props.columns}`);
  }

  if (!props.courses?.length) {
    classes.push('courses--no-result');
  }

  return classes.join(' ');
});

const itemListElements = computed<ListItem[]>(
  () => Object.values(courses.value).map((course: ICourse, index: number) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${config.public.siteUrl}${course.link}`,
  })),
);

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: itemListElements.value,
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/courses";
</style>
