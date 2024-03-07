<template>
  <Reducer class="text">
    <div
      class="text__content"
      v-html="text"
    />
  </Reducer>
</template>

<script setup lang="ts">
import Reducer from '@/components/atoms/Reducer.vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/atoms/text";
</style>