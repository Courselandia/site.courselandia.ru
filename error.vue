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
import { storeToRefs } from 'pinia';
import {
  ref,
  toRefs,
} from 'vue';

import Error from '@/components/atoms/Error.vue';
import Dropdowns from '@/components/organism/Dropdowns.vue';
import Footer from '@/components/organism/Footer.vue';
import Header from '@/components/organism/Header.vue';
import direction from '@/stores/direction';
import school from '@/stores/school';

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const menu = ref('');

const { error } = toRefs(props);

try {
  const result = await $fetch('/api/direction/read');

  const { directions } = storeToRefs(direction());
  directions.value = result;
} catch (err: any) {
  console.error(err.message);
}

try {
  const result = await $fetch('/api/school/read');

  const { schools } = storeToRefs(school());
  schools.value = result;
} catch (err: any) {
  console.error(err.message);
}

useHead({
  title: `Ошибка ${error.value.statusCode}`,
});
</script>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
