<template>
  <div class="course-tile-favorite">
    <div class="course-tile-favorite__heart">
      <div class="course-tile-favorite__to-center">
        <ClientOnly>
          <FavoriteCourse
            :id="id"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import FavoriteCourse from '@/components/modules/course/organism/FavoriteCourse.vue';
import type TId from '@/types/id';

const props = defineProps({
  id: {
    type: [String, Number] as PropType<TId>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileFavorite";
</style>
