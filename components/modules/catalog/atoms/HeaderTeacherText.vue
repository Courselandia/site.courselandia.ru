<template>
  <div class="header-teacher-text">
    <Reducer>
      <span v-html="text" />
    </Reducer>
  </div>
</template>

<script lang="ts" setup>
import Reducer from '@/components/atoms/Reducer.vue';

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherText";
</style>
