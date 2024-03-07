<template>
  <Reviews />
</template>

<script lang="ts" setup>
import Reviews from '@/components/modules/reviewSchools/Index.vue';

/*
useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['reviews']);
});
 */

const config = useRuntimeConfig();
const title = 'Реальные отзывы об онлайн-школах и их курсах';
const description = 'Отзывы об онлайн-школах и их курсах. Честные и реальные отзывы от студентов, закончивших обучение в онлайн-школах';

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
      href: `${config.public.siteUrl}/reviews`,
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
