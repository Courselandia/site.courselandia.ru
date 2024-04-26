<template>
  <div class="header-teacher-school">
    <div class="header-teacher-school__label">
      Школа:
    </div>
    <div class="header-teacher-school__value">
      <nuxt-link
        :to="`/courses/school/${link}`"
        class="header-teacher-school__link"
        prefetch
      >
        {{ name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherSchool";
</style>
