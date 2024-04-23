<template>
  <Publications />
</template>

<script lang="ts" setup>
import Publications from '@/components/modules/publications/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['blog']);
});

const config = useRuntimeConfig();
const title = 'Блог courselandia.ru об онлайн-курсах';
const description = 'Статьи посвященные онлайн-курсам: программирование, дизайн, управление проектами, разработка игр, бизнес, методика обучения, мотивация, карьерное развитие, стоимость обучения и многое другое.';

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
    'preload-stat',
  ],
});
</script>
