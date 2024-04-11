<template>
  <div class="page">
    <div class="page__header">
      <div class="page__header-slide">
        <RenderCacheable
          :cache-tags="['header']"
        >
          <Header
            v-model:menu="menu"
            :active="active"
          />
        </RenderCacheable>
      </div>
    </div>
    <div class="page__dropdown">
      <RenderCacheable
        :cache-tags="['dropdown']"
      >
        <Dropdowns
          v-model:menu="menu"
        />
      </RenderCacheable>
    </div>
    <div class="page__body">
      <slot />
    </div>
    <div class="page__footer">
      <RenderCacheable
        :cache-tags="['footer']"
      >
        <Footer />
      </RenderCacheable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import Dropdowns from '@/components/modules/layouts/general/organism/Dropdowns.vue';
import Footer from '@/components/modules/layouts/general/organism/Footer.vue';
import Header from '@/components/modules/layouts/general/organism/Header.vue';

const config = useRuntimeConfig();
const route = useRoute();
const menu = ref('');
const active = ref<string | undefined>('');

const setActive = (): void => {
  if (route.path.indexOf('/courses/school/') !== -1) {
    active.value = 'schools';
  } else if (route.path.indexOf('/courses') !== -1) {
    active.value = 'courses';
  } else if (route.path.indexOf('/reviews') !== -1) {
    active.value = 'reviews';
  } else if (route.path.indexOf('/blog') !== -1) {
    active.value = 'blog';
  } else if (route.path.indexOf('/collections') !== -1) {
    active.value = 'collections';
  } else {
    active.value = undefined;
  }
};

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Courselandia',
  description: 'Courselandia — это огромный каталог онлайн курсов по разным направлениям с умным поиском по навыкам, направлениям, профессиям и инструментам. Найдите свой курс быстро и легко.',
  image: `${config.public.apiUrl}/storage/uploaded/images/prev.webp`,
  logo: `${config.public.apiUrl}/storage/uploaded/images/logo.webp`,
  url: config.public.siteUrl,
});

watch(route, () => {
  setActive();
});

setActive();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/page";
</style>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
