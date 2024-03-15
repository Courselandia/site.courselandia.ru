<template>
  <div class="publication">
    <nuxt-link
      :to="`/blog/${publication.link}`"
      class="publication__link"
    >
      <Image
        :path="publication.image_middle_id?.path"
        :title="publication.header"
      />
      <Header
        :header="publication.header"
      />
      <Anons
        :anons="publication.anons"
      />
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Header from '@/components/modules/publications/atoms/Header.vue';
import Image from '@/components/modules/publications/atoms/Image.vue';
import Anons from '@/components/modules/publications/atoms/Anons.vue';
import type IPublication from '@/interfaces/stores/publication/publication';

const props = defineProps({
  publication: {
    type: Object as PropType<IPublication>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/molecules/publication";
</style>
