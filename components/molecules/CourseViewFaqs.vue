<template>
  <div class="course-view-faqs">
    <Faqs>
      <Faq>
        <template #question>
          Когда проходят занятия? Возможно ли совмещать с работой?
        </template>
        <template #answer>
          Разберетесь с функционалом программы, ознакомитесь с процессом
          создания анимации, поговорите о том, что собой представляет нод и нодовая система.
        </template>
      </Faq>

      <Faq>
        <template #question>
          Сколько часов в неделю необходимо будет заниматься?
        </template>
        <template #answer>
          Когда проходят занятия? Возможно ли совмещать с работой?

          Сколько часов в неделю необходимо будет заниматься? Именно вы решаете, когда и сколько
          заниматься. Обычно студенты тратят на обучение от трех до пяти часов в неделю.
        </template>
      </Faq>
      <Faq>
        <template #question>
          Будет ли какая-то связь с преподавателями?
        </template>
        <template #answer>
          Да, вы всегда сможете задать вопрос преподавателю в личном кабинете.
          Также вы будете получать от него обратную связь после выполнения домашних заданий.
        </template>
      </Faq>
      <Faq>
        <template #question>
          Есть ли какие-либо программы рассрочки?
        </template>
        <template #answer>
          Да, вы можете купить курс в рассрочку, что позволит вам лучше спланировать свой бюджет.
        </template>
      </Faq>
    </Faqs>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Faq from '@/components/atoms/Faq.vue';
import Faqs from '@/components/molecules/Faqs.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewFaqs.scss";
</style>
