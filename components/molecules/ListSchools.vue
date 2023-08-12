<template>
  <div class="list-schools">
    <nuxt-link
      v-for="(school, key) in schools"
      :key="key"
      :to="`/courses/school/${school.link}`"
      class="list-schools__item"
      @click="onClick"
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
    type: Array<IMenu>,
    required: true,
  },
});

const emit = defineEmits({
  click: () => true,
});

const onClick = (): void => {
  emit('click');
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/listSchools.scss";
</style>
