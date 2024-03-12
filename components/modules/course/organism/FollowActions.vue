<template>
  <div class="follow-actions">
    <div class="follow-actions__item follow-actions__item--button">
      <Button
        :to="url"
        link="link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        @click="onClick"
      >
        Перейти
      </Button>
    </div>
    <div class="follow-actions__item follow-actions__item--favorite">
      <FavoriteCourse
        :id="id"
        :mobile="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import FavoriteCourse from '@/components/modules/course/organism/FavoriteCourse.vue';
import track from '@/helpers/track';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const onClick = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/organism/followActions";
</style>