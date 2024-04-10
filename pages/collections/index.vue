<template>
  <Collections />
</template>

<script lang="ts" setup>
import Collections from '@/components/modules/collections/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['collections']);
});

const config = useRuntimeConfig();
const title = 'Подборки лучших онлайн-курсов от Courselandia';
const description = 'Подборка онлайн-курсов от Courselandia по разным направлениям: программирование, дизайн, маркетинг, бизнес и т.д.';

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
      href: `${config.public.siteUrl}/blog`,
    },
  ],
});

definePageMeta({
  middleware: [
    'preload-directions',
    'preload-schools',
  ],
});
</script>
