<template>
  <div class="list-schools">
    <nuxt-link
      v-for="(school, key) in schools"
      :key="key"
      :to="school.link"
      class="list-schools__item"
    >
      {{ school.label }}
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import IMenu from '@/interfaces/menu';

const props = defineProps({
  schools: {
    type: Array as PropType<Array<IMenu>>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/listSchools.scss";
</style>
