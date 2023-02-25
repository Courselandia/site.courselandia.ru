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
import {
  PropType,
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
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewFaqs.scss";
</style>
