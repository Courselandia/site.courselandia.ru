<template>
  <div class="header-teacher-direction">
    <div class="header-teacher-direction__label">
      Направление:
    </div>
    <div class="header-teacher-direction__value">
      <nuxt-link
        :to="`/courses/direction/${link}`"
        class="header-teacher-direction__link"
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
@import "@/assets/scss/components/modules/catalog/atoms/headerTeacherDirection";
</style>
