<template>
  <div class="course-promocode-popover-code-info-action">
    <div
      v-if="!showCode"
      class="course-promocode-popover-code-info-action__button"
    >
      <Button
        wide
        @click.stop="onClick"
      >
        Показать промокод
      </Button>
    </div>
    <div
      v-else
      class="course-promocode-popover-code-info-action__code"
    >
      <CoursePromocodePopoverCodeInfoShowCode
        :code="code"
        :url="url"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import CoursePromocodePopoverCodeInfoShowCode from '@/components/modules/catalog/molecules/CoursePromocodePopoverCodeInfoShowCode.vue';

defineProps({
  code: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const showCode = ref(false);

const onClick = (): void => {
  showCode.value = true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/promocodePopoverCodeInfoAction";
</style>
