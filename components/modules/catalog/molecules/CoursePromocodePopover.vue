<template>
  <Popover
    v-if="course.currency"
    v-model:active="activeValue"
  >
    <CoursePromocodePopoverTitle />
    <CoursePromocodePopoverPrices
      :course="course"
    />
    <CoursePromocodePopoverCodeInfo
      v-if="course.school?.promocode"
      :promocode="course.school.promocode"
    />
    <CoursePromocodePopoverButtonGo
      :link="course.link"
    />
  </Popover>
</template>

<script setup lang="ts">
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Popover from '@/components/atoms/Popover.vue';
import CoursePromocodePopoverButtonGo from '@/components/modules/catalog/atoms/CoursePromocodePopoverButtonGo.vue';
import CoursePromocodePopoverTitle from '@/components/modules/catalog/atoms/CoursePromocodePopoverTitle.vue';
import CoursePromocodePopoverCodeInfo from '@/components/modules/catalog/molecules/CoursePromocodePopoverCodeInfo.vue';
import CoursePromocodePopoverPrices from '@/components/modules/catalog/molecules/CoursePromocodePopoverPrices.vue';
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
  'update:active': (_: boolean) => true,
});

const { active } = toRefs(props);

const activeValue = ref<boolean>(active.value);

watch(activeValue, () => {
  emit('update:active', activeValue.value);
});

watch(active, () => {
  activeValue.value = active.value;
});
</script>
