<template>
  <div class="card-promocode-code-info">
    <CardPromocodeCodeInfoMessage />
    <CoursePromocodePopoverCodeInfoShowCode
      :code="code"
      :url="url"
    />
  </div>
</template>

<script lang="ts" setup>
import CoursePromocodePopoverCodeInfoShowCode from '@/components/modules/catalog/molecules/CoursePromocodePopoverCodeInfoShowCode.vue';
import CardPromocodeCodeInfoMessage from '@/components/modules/course/atoms/CardPromocodeCodeInfoMessage.vue';

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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/cardPromocodeCodeInfo";
</style>
