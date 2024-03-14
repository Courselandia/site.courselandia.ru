<template>
  <div class="header-teacher-city">
    {{ city }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  city: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherCity";
</style>
