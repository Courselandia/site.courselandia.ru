<template>
  <div class="card-features">
    <div class="card-features__header">
      <div class="card-features__label">
        Кратко о курсе
      </div>
      <div class="card-features__line" />
    </div>
    <div class="card-features__items">
      <CardFeature
        v-for="(feature, key) in features"
        :key="key"
        :icon="feature.icon"
        :text="feature.text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import CardFeature from '@/components/modules/course/atoms/CardFeature.vue';
import type IFeature from '@/interfaces/components/modules/course/feature';

const props = defineProps({
  features: {
    type: Object as PropType<Array<IFeature>>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/cardFeatures";
</style>
