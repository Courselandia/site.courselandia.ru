<template>
  <div
    v-if="faqItems?.length"
    class="mb-40 mb-12-md"
  >
    <h2 class="title title--1">
      Часто задаваемые вопросы
    </h2>

    <Faqs
      :faqs="faqItems"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import { apiReadFaqs } from '@/api/faq';
import Faqs from '@/components/modules/course/molecules/Faqs.vue';
import faqsStoreToFaqsComponent from '@/converts/faqsStoreToFaqsComponent';
import type IFaqComponent from '@/interfaces/components/modules/course/faq';

const props = defineProps({
  school: {
    type: String,
    required: true,
  },
});

const faqItems = ref<Array<IFaqComponent>>([]);

try {
  const faqsStore = await apiReadFaqs(
    props.school,
  );

  if (faqsStore) {
    faqItems.value = faqsStoreToFaqsComponent(faqsStore);
  }
} catch (error: any) {
  console.error(error.message);
}
</script>
