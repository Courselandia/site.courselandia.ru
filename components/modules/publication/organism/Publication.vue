<template>
  <div
    v-if="itemLinkPublication"
    class="publication content content--small mt-12 mb-24 mb-12-sm"
  >
    <Image
      v-if="itemLinkPublication.image_big_id?.path"
      :path="itemLinkPublication.image_big_id?.path"
      :title="itemLinkPublication.header"
    />
    <Header
      :header="itemLinkPublication.header"
    />
    <Article
      :article="itemLinkPublication.article"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import Article from '@/components/modules/publication/atoms/Article.vue';
import Header from '@/components/modules/publication/atoms/Header.vue';
import Image from '@/components/modules/publication/atoms/Image.vue';
import publication from '@/stores/publication';

const { itemLinkPublication } = storeToRefs(publication());
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publication/organism/publication";
</style>
