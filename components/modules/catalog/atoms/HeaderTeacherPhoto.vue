<template>
  <div class="header-teacher-photo">
    <img
      v-if="path"
      :src="path"
      class="header-teacher-photo__image"
      :alt="name"
      :title="name"
    />
    <img
      v-else-if="holder.default"
      :src="holder.default"
      class="header-teacher-photo__image"
    />
  </div>
</template>

<script setup lang="ts">
import LazyImage from '@/components/atoms/LazyImage.vue';

defineProps({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: false,
    default: null,
  },
});

const holder = await import('assets/images/holder.svg');
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherPhoto";
</style>
