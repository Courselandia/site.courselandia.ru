<template>
  <PrivacyPolicy />
</template>

<script lang="ts" setup>
import PrivacyPolicy from '@/components/modules/privacyPolicy/Index.vue';

useRouteCache((helper: any) => {
  helper.setMaxAge(3600 * 24).setCacheable().addTags(['privacy-policy']);
});

const title = 'Политика в отношении обработки персональных данных';
const description = 'Наша политика безопасности по обработке персональных данных.';

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
