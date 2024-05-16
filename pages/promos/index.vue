<template>
  <Promos />
</template>

<script lang="ts" setup>
import Promos from '@/components/modules/promos/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['promos']);
});

const config = useRuntimeConfig();
const title = 'Промокоды, акции, купоны и скидки на онлайн-курсы — Courselandia';
const description = 'Каталог промокодов, акций, купонов и скидок от всех известных онлайн-школ. Бери понравившиеся онлайн-курсы с максимальной скидкой от Courselandia.';

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
  ],
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/promocodes`,
    },
  ],
});

definePageMeta({
  middleware: [
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
