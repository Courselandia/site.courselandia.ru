<template>
  <div class="publication">
    <nuxt-link
      :to="`/blog/${publication.link}`"
      class="publication__link"
      prefetch
    >
      <Image
        :path="publication.image_middle?.path"
        :title="publication.header"
        :width="publication.image_middle?.width"
        :height="publication.image_middle?.height"
      />
      <Header
        :header="publication.header"
      />
      <Anons
        v-if="publication.anons"
        :anons="publication.anons"
      />
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Anons from '@/components/modules/publications/atoms/Anons.vue';
import Header from '@/components/modules/publications/atoms/Header.vue';
import Image from '@/components/modules/publications/atoms/Image.vue';
import type IPublication from '@/interfaces/stores/publication/publication';

defineProps({
  publication: {
    type: Object as PropType<IPublication>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/molecules/publication";
</style>
