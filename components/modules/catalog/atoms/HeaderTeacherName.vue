<template>
  <h1 class="header-teacher-name">
    {{ name }}
  </h1>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherName";
</style>
