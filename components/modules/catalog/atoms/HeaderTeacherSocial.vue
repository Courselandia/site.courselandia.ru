<template>
  <a
    :href="url"
    :class="`header-teacher-social header-teacher-social--${name}`"
    :title="name"
    target="_blank"
    rel="noopener noreferrer nofollow"
  />
</template>

<script lang="ts" setup>
defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherSocial";
</style>
