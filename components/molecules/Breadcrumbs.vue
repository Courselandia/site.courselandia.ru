<template>
  <div class="breadcrumbs">
    <template
      v-for="(breadcrumb, key) in breadcrumbs"
      :key="key"
    >
      <nuxt-link
        :to="breadcrumb.to"
        class="breadcrumbs__item"
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
import { PropType } from 'vue';

import IBreadcrumb from '@/interfaces/components/molecules/breadcrumb';

const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<Array<IBreadcrumb>>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/breadcrumbs.scss";
</style>
