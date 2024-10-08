<template>
  <div
    v-if="itemLinkPublication"
    class="publication content content--small mt-12 mb-24 mb-12-sm titles"
  >
    <Image
      v-if="itemLinkPublication.image_big?.path"
      :path="itemLinkPublication.image_big?.path"
      :title="itemLinkPublication.header"
      :width="itemLinkPublication.image_big?.width"
      :height="itemLinkPublication.image_big?.height"
    />
    <Header
      :header="itemLinkPublication.header"
    />
    <Article
      v-if="itemLinkPublication.article"
      :article="itemLinkPublication.article"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';

import Article from '@/components/modules/publication/atoms/Article.vue';
import Header from '@/components/modules/publication/atoms/Header.vue';
import Image from '@/components/modules/publication/atoms/Image.vue';
import publication from '@/stores/publication';

const { itemLinkPublication } = storeToRefs(publication());
const config = useRuntimeConfig();
const title = itemLinkPublication.value?.metatag?.title;
const description = itemLinkPublication.value?.metatag?.description;
const image = itemLinkPublication.value?.image_big?.path;
const width = itemLinkPublication.value?.image_big?.width;
const height = itemLinkPublication.value?.image_big?.height;

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image || `${config.public.apiUrl}/storage/uploaded/images/prev.png`,
    },
    {
      property: 'og:image:width',
      content: width || '1200',
    },
    {
      property: 'og:image:height',
      content: height || '630',
    },
  ],
});

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${config.public.apiUrl}/blog/${itemLinkPublication.value?.link}`,
  },
  headline: itemLinkPublication.value?.header,
  image: {
    '@type': 'ImageObject',
    url: image || `${config.public.apiUrl}/storage/uploaded/images/prev.png`,
    width: String(width) || '1200',
    height: String(height) || '630',
  },
  datePublished: dayjs(itemLinkPublication.value?.published_at).toISOString(),
  dateModified: dayjs(itemLinkPublication.value?.published_at).toISOString(),
  publisher: {
    '@type': 'Organization',
    name: 'Courselandia',
    logo: {
      '@type': 'ImageObject',
      url: `${config.public.apiUrl}/storage/uploaded/images/logo.webp`,
      width: '1024',
      height: '1024',
    },
  },
  description: itemLinkPublication.value?.anons || '',
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publication/organism/publication";
</style>

<style lang="scss">
@import "@/assets/scss/components/modules/publication/organism/publicationAlso";
@import "@/assets/scss/components/modules/collection/organism/collectionAlso";
</style>
