<template>
  <div class="header-teacher-socials">
    <HeaderTeacherSocial
      v-for="(social, key) in socialMedias"
      :key="key"
      :name="social.name"
      :url="social.value"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import HeaderTeacherSocial from '@/components/modules/catalog/atoms/HeaderTeacherSocial.vue';
import type ISocialMedia from '@/interfaces/stores/socialMedia';

const props = defineProps({
  socialMedias: {
    type: Object as PropType<Array<ISocialMedia>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacherSocials";
</style>
