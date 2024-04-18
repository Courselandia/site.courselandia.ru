<template>
  <Bubbles>
    <div class="content">
      <Header
        :course="course"
      />
    </div>
  </Bubbles>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Bubbles from '@/components/atoms/Bubbles.vue';
import Header from '@/components/modules/course/molecules/Header.vue';
import type ICourse from '@/interfaces/components/modules/course';

defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
