<template>
  <div class="course-view-faqs">
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
import { JsonLD, JsonLDFunc } from 'nuxt-jsonld/dist/types/index.d';
import {
  computed,
  PropType,
  toRefs,
} from 'vue';

import Faq from '@/components/atoms/Faq.vue';
import Faqs from '@/components/molecules/Faqs.vue';
import IFaqComponent from '@/interfaces/components/molecules/faq';

const props = defineProps({
  faqs: {
    type: Array as PropType<Array<IFaqComponent>>,
    required: true,
  },
});

const { faqs } = toRefs(props);

const faqsJsonLd = computed<JsonLD | JsonLDFunc>(() => {
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

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewFaqs.scss";
</style>
