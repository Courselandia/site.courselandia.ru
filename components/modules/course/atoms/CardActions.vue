<template>
  <div class="card-actions">
    <div class="card-actions__item card-actions__item--button">
      <Button
        :to="url"
        link="link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        wide
        @click="onClick"
      >
        На сайт курса
      </Button>
    </div>
    <div class="card-actions__item card-actions__item--favorite">
      <FavoriteCourse
        :id="id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import FavoriteCourse from '@/components/organism/FavoriteCourse.vue';
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
@import "@/assets/scss/components/modules/course/atoms/cardActions";
</style>
