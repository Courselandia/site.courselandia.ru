<template>
  <Reducer
    :height="120"
    class="school-text"
  >
    <div
      class="school-text__content"
      v-html="text"
    />
  </Reducer>
</template>

<script setup lang="ts">
import Reducer from '@/components/atoms/Reducer.vue';

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/atoms/schoolText";
</style>
