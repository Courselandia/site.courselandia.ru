<template>
  <div class="breadcrumbs">
    <template
      v-for="(breadcrumb, key) in breadcrumbs"
      :key="key"
    >
      <nuxt-link
        :to="breadcrumb.to"
        class="breadcrumbs__item"
        prefetch
      >
        {{ breadcrumb.name }}
      </nuxt-link>
      <div
        v-if="(breadcrumbs.length - 1) !== key"
        class="breadcrumbs__separator"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import type IBreadcrumb from '@/interfaces/components/molecules/breadcrumb';

defineProps({
  breadcrumbs: {
    type: Array as PropType<Array<IBreadcrumb>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/molecules/breadcrumbs";
</style>
