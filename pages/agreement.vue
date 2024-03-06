<template>
  <Agreement />
</template>

<script lang="ts" setup>
import Agreement from '@/components/modules/agreement/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['agreement']);
});

const title = 'Пользовательское соглашение';
const description = 'Полный текст пользовательского соглашения, который вы обязуетель исполнять если используете наш ресур.';

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
  ],
});
</script>
