<template>
  <div
    :title="name"
    class="course-tile-name"
    v-html="name"
  />
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/courseTileName";
</style>
