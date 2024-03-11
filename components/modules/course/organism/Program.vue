<template>
  <ClientOnly>
    <!--noindex-->
    <div
      v-if="course.program?.length"
      class="mb-40 mb-12-md"
    >
      <Program
        :course="course"
      />
    </div>
    <!--/noindex-->
  </ClientOnly>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Program from '@/components/modules/course/molecules/Program.vue';
import type ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
