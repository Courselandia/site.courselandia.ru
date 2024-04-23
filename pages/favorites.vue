<template>
  <Favorites />
</template>

<script lang="ts" setup>
import Favorites from '@/components/modules/favorites/Index.vue';

const title = 'Список Избранного';
const description = 'Список избранных онлайн курсов разных направлений от программирования до маркетинга. Найди свой онлйн курс и прокачайся.';

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
});

definePageMeta({
  middleware: [
    'preload-directions',
    'preload-schools',
    'preload-stat',
  ],
});
</script>
