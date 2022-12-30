<template>
  <nuxt-link
    to="/courses/first"
    class="course-search-result"
  >
    <div class="course-search-result__media">
      <LazyImage
        src="https://api.academy-market.com/storage/images/cache/desktop_65f7846966d5f4a06083cc5e6c35fb9e7606107e16293612233471-w600_crop.png"
        class="course-search-result__image"
      />
    </div>
    <div class="course-search-result__info">
      <div class="course-search-result__direction">
        Маркетинг
      </div>
      <div class="course-search-result__name">
        Houdini c нуля до PRO — курс по созданию визуальных эффектов
      </div>
      <div class="course-search-result__price">
        4 700 ₽
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import LazyImage from '@/components/atoms/LazyImage.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseSearchResult.scss";
</style>
