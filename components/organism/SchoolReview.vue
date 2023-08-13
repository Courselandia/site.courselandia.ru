<template>
  <div
    v-if="itemLinkSchool"
    class="school-review"
  >
    <div class="school-review__header">
      <Bubbles>
        <div class="content">
          <SchoolReviewHeader
            :school="itemLinkSchool"
          />
        </div>
      </Bubbles>
    </div>
    <div
      ref="contentRef"
      class="school-review__content content"
    >
      <div ref="cardRef">
        <SchoolReviewCard
          :school="itemLinkSchool"
          :scroll="scroll"
          @filter="onFilter"
        />
      </div>
      <div class="school-review__info">
        HERE!
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import Bubbles from '@/components/atoms/Bubbles.vue';
import SchoolReviewCard from '@/components/molecules/SchoolReviewCard.vue';
import SchoolReviewHeader from '@/components/molecules/SchoolReviewHeader.vue';
import plural from '@/helpers/plural';
import school from '@/stores/school';

const scroll = ref(true);
const contentRef = ref<HTMLElement | null>(null);

const setScroll = (): void => {
  const card = document.querySelector('#school-review-card');

  if (contentRef.value && card) {
    const gapHeight = window.screen.availHeight - card.getBoundingClientRect().height - 150;
    const height = contentRef.value.offsetHeight;
    const top = contentRef.value.offsetTop;
    const screenHeight = window.screen.availHeight;
    const lineBottom = height + top - screenHeight + gapHeight;

    scroll.value = window.scrollY <= lineBottom;
  }
};

const onFilter = (rating: number | null): void => {

};

onMounted(() => {
  window.addEventListener('scroll', () => {
    setScroll();
  });

  setScroll();
});

const { itemLinkSchool } = storeToRefs(school());
const title = `Школа ${itemLinkSchool.value?.name}: ${itemLinkSchool.value?.amount_courses.all} ${plural(itemLinkSchool.value?.amount_courses.all || 0, { 1: 'отзыв', '2+': 'отзыва', '5+': 'отзывов' })} (${itemLinkSchool.value?.rating}⭐️) от учеников проходивших курсы`;
const description = `Список проверенных отзывов о школе ${itemLinkSchool.value?.name} от реальных учеников, проходивших курсы. ${itemLinkSchool.value?.amount_courses.all} ${plural(itemLinkSchool.value?.amount_courses.all || 0, { 1: 'отзыв', '2+': 'отзыва', '5+': 'отзывов' })} со средней оценкой ${itemLinkSchool.value?.rating}⭐️`;

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
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/schoolReview.scss";
</style>
