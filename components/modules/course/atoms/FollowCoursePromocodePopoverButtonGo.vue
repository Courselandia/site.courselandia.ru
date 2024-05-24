<template>
  <Button
    :to="url"
    type="secondary"
    link="link"
    wide
    class="follow-course-promocode-popover-button-go"
    target="_blank"
    rel="nofollow noopener noreferrer"
    @click="onClickGoSchool"
  >
    Перейти на сайт
  </Button>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import track from '@/helpers/track';

defineProps({
  url: {
    type: String,
    required: true,
  },
});

const onClickGoSchool = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/followCoursePromocodePopoverButtonGo";
</style>
