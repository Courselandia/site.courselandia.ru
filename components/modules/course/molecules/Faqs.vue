<template>
  <div class="faqs">
    <Faqs>
      <Faq
        v-for="(faq, key) in faqs"
        :key="key"
      >
        <template #question>
          {{ faq.question }}
        </template>
        <template #answer>
          {{ faq.answer }}
        </template>
      </Faq>
    </Faqs>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  toRefs,
} from 'vue';

import Faq from '@/components/modules/course/atoms/Faq.vue';
import Faqs from '@/components/modules/course/atoms/Faqs.vue';
import type IFaqComponent from '@/interfaces/components/molecules/faq';

const props = defineProps({
  faqs: {
    type: Array as PropType<Array<IFaqComponent>>,
    required: true,
  },
});

const { faqs } = toRefs(props);

const faqsJsonLd = computed<any>(() => {
  const mainEntities = Object.values(faqs.value).map((faq: IFaqComponent) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntities,
  };
});

useJsonld(faqsJsonLd.value);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/molecules/faqs";
</style>
