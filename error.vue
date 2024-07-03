<template>
  <div class="page">
    <div class="page__header">
      <Header v-model:menu="menu" />
    </div>
    <div class="page__dropdown">
      <Dropdowns v-model:menu="menu" />
    </div>
    <div class="page__body">
      <div class="content mt-24 mb-24">
        <Error
          v-if="error.statusCode === 404 || error.statusCode === '404'"
          :code="error.statusCode"
          title="Упс, страница не найдена!"
          message="Так уж получилось, что из множества страниц нашего сайта Вы оказались как раз на той, которая уже не существует..."
        />
        <Error
          v-else
          :code="error.statusCode"
          title="Упс, произошла ошибка!"
          message="Так уж получилось, что на сайте произошла ошибка, приносим свои извенения мы обязательно устраним эту проблему."
          :stack="error.stack"
          :error="error.message"
        />
      </div>
    </div>
    <div class="page__footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
} from 'vue';

import { apiReadDirections } from '@/api/direction';
import { apiReadSchools } from '@/api/school';
import Error from '@/components/atoms/Error.vue';
import Dropdowns from '@/components/modules/layouts/general/organism/Dropdowns.vue';
import Footer from '@/components/modules/layouts/general/organism/Footer.vue';
import Header from '@/components/modules/layouts/general/organism/Header.vue';

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const menu = ref('');

const { error } = toRefs(props);

try {
  await apiReadDirections();
} catch (err: any) {
  console.error(err.message);
}

try {
  await apiReadSchools();
} catch (err: any) {
  console.error(err.message);
}

useHead({
  title: `Ошибка ${error.value.statusCode}`,
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layouts/default.scss";
</style>
