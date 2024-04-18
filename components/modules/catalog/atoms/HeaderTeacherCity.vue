<template>
  <div class="header-teacher-city">
    {{ city }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  city: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherCity";
</style>
