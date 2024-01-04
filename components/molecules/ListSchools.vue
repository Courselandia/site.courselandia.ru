<template>
  <div class="list-schools">
    <div
      v-for="(school, key) in schools"
      :key="key"
      class="list-schools__item"
    >
      <nuxt-link
        :to="`/courses/school/${school.link}`"
        class="list-schools__link"
        @click="onClick"
      >
        {{ school.label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type IMenu from '@/interfaces/menu';

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
