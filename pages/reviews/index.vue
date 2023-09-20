<template>
  <div class="content pt-12 pb-40 pt-12-sm pb-12-sm">
    <h1 class="title title--1">
      Отзывы об онлайн школах
    </h1>

    <SchoolReviews />
  </div>
</template>

<script lang="ts" setup>
import SchoolReviews from '@/components/organism/SchoolReviews.vue';

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
