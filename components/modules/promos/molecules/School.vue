<template>
  <div class="school">
    <div class="school__logo">
      <Logo
        :image="school.image_logo_id?.path"
        :label="school.name"
        :site="school.referral"
      />
    </div>
    <div class="school__info">
      <SchoolText
        v-if="school.text"
        :text="school.text"
      />
      <Stats
        class="school__stats"
        :school="school"
      />
    </div>
    <div class="school__action">
      HERE!
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Logo from '@/components/modules/promos/atoms/Logo.vue';
import SchoolText from '@/components/modules/promos/atoms/SchoolText.vue';
import Stats from '@/components/modules/promos/molecules/Stats.vue';
import type ISchool from '@/interfaces/stores/promo/school';

defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promos/molecules/school";
</style>
