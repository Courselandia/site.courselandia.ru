<template>
  <div class="promo-pop-up-logo">
    <div class="promo-pop-up-logo__border">
      <div class="promo-pop-up-logo__content">
        <img
          v-if="logo"
          src="https://api.courselandia.ru/storage/images/schools/6410c538e36d31d8df053d44.webp?1678820664"
          :alt="school"
          :title="school"
          class="promo-pop-up-logo__image"
        >
        <div
          v-else
          class="promo-pop-up-logo__name"
        >
          {{ school }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  school: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/atoms/promoPopUpLogo";
</style>
