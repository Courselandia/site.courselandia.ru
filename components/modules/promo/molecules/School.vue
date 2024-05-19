<template>
  <nuxt-link
    :to="`/promos/${school.link}`"
    class="school"
  >
    <div class="school__title">
      {{ school.name }}
    </div>
    <div class="school__stats">
      <Stats
        :school="school"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Stats from '@/components/modules/promo/molecules/Stats.vue';
import type ISchool from '@/interfaces/stores/promo/school';

defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/promo/molecules/school";
</style>
