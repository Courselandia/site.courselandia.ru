<template>
  <nuxt-link
    :to="teacher.link"
    :class="`teacher ${mobile ? 'teacher--mobile' : ''}`"
  >
    <div class="teacher__picture">
      <LazyImage
        v-if="teacher.image?.path"
        :src="teacher.image.path"
        class="teacher__image"
        :alt="teacher.label"
        :title="teacher.label"
      />
      <ClientOnly
        v-else
      >
        <Animal />
      </ClientOnly>
    </div>
    <div class="teacher__info">
      <div class="teacher__name">
        {{ teacher.label }}
      </div>
      <ClientOnly>
        <div
          v-if="teacher.extra"
          class="teacher__position"
        >
          {{ teacher.extra }}
        </div>
      </ClientOnly>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import LazyImage from '@/components/atoms/LazyImage.vue';
import type ITeacher from '@/interfaces/components/modules/catalog/teacher';

defineProps({
  teacher: {
    type: Object as PropType<ITeacher>,
    required: true,
  },
  mobile: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/teacher";
</style>
