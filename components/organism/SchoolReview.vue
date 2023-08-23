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
        <div class="school-review__sorts">
          <div class="school-review__sort school-review__sort--active">
            <Icon
              name="sort-asc"
              :size="[16, 16]"
              color="black"
              class="school-review__sort-icon"
            />
            <div class="school-review__sort-field">
              По дате
            </div>
          </div>
          <div class="school-review__sort">
            <div class="school-review__sort-field">
              По оценке
            </div>
          </div>
        </div>
        <div class="school-review__reviews">
          <div class="school-review__review">
            <Rate
              :value="4"
              class="school-review__review-rate"
            />
            <div class="school-review__review-title">
              Именно то, что мне нужно!
            </div>
            <div class="school-review__review-sub-title">
              Достоинства
            </div>
            <div class="school-review__review-text">
              Проходила курс от школы GeekBrains. Несмотря на то, что цена и впрям завышена,
              есть возможность сэкономить на обучении 13 процентов от общей суммы,
              сделав возврат НДФ. Среди достоинств отмечу возможность выполнять
              практические задачи, которые вы получаете после каждого видео-урока.
              На выполненное задание преподаватели дают комментарии, указывают
              на ошибки и показывают, что нужно дополнить, доработать. От урока
              к уроку степень сложности возрастает.
            </div>
            <div class="school-review__review-sub-title">
              Недостатки
            </div>
            <div class="school-review__review-text">
              Из недостатков в первую очередь стоит отметить завышенную цену.
              Также определенным недостатком может быть то, что для новичков
              курс может показаться сложноватым. Учебе нужно будет уделять
              много времени. И для меня это было минусом, так как тяжело совмещать учебу и работу.
            </div>
            <div class="school-review__review-info">
              <div class="school-review__review-avatar">
                <Animal />
              </div>
              <div class="school-review__review-name-and-date">
                <div class="school-review__review-name">
                  Ольга Петровна
                </div>
                <div class="school-review__review-date">
                  12 октября 2023 года
                </div>
              </div>
              <div class="school-review__review-source">
                yandex.ru
              </div>
            </div>
          </div>
          <div class="school-review__review">
            <Rate
              :value="4"
              class="school-review__review-rate"
            />
            <div class="school-review__review-title">
              Именно то, что мне нужно!
            </div>
            <div class="school-review__review-sub-title">
              Достоинства
            </div>
            <div class="school-review__review-text">
              Проходила курс от школы GeekBrains. Несмотря на то, что цена и впрям завышена,
              есть возможность сэкономить на обучении 13 процентов от общей суммы,
              сделав возврат НДФ. Среди достоинств отмечу возможность выполнять
              практические задачи, которые вы получаете после каждого видео-урока.
              На выполненное задание преподаватели дают комментарии, указывают
              на ошибки и показывают, что нужно дополнить, доработать. От урока
              к уроку степень сложности возрастает.
            </div>
            <div class="school-review__review-sub-title">
              Недостатки
            </div>
            <div class="school-review__review-text">
              Из недостатков в первую очередь стоит отметить завышенную цену.
              Также определенным недостатком может быть то, что для новичков
              курс может показаться сложноватым. Учебе нужно будет уделять
              много времени. И для меня это было минусом, так как тяжело совмещать учебу и работу.
            </div>
            <div class="school-review__review-info">
              <div class="school-review__review-avatar">
                <Animal />
              </div>
              <div class="school-review__review-name-and-date">
                <div class="school-review__review-name">
                  Ольга Петровна
                </div>
                <div class="school-review__review-date">
                  12 октября 2023 года
                </div>
              </div>
              <div class="school-review__review-source">
                yandex.ru
              </div>
            </div>
          </div>
          <div class="school-review__review">
            <Rate
              :value="4"
              class="school-review__review-rate"
            />
            <div class="school-review__review-title">
              Именно то, что мне нужно!
            </div>
            <div class="school-review__review-sub-title">
              Достоинства
            </div>
            <div class="school-review__review-text">
              Проходила курс от школы GeekBrains. Несмотря на то, что цена и впрям завышена,
              есть возможность сэкономить на обучении 13 процентов от общей суммы,
              сделав возврат НДФ. Среди достоинств отмечу возможность выполнять
              практические задачи, которые вы получаете после каждого видео-урока.
              На выполненное задание преподаватели дают комментарии, указывают
              на ошибки и показывают, что нужно дополнить, доработать. От урока
              к уроку степень сложности возрастает.
            </div>
            <div class="school-review__review-sub-title">
              Недостатки
            </div>
            <div class="school-review__review-text">
              Из недостатков в первую очередь стоит отметить завышенную цену.
              Также определенным недостатком может быть то, что для новичков
              курс может показаться сложноватым. Учебе нужно будет уделять
              много времени. И для меня это было минусом, так как тяжело совмещать учебу и работу.
            </div>
            <div class="school-review__review-info">
              <div class="school-review__review-avatar">
                <Animal />
              </div>
              <div class="school-review__review-name-and-date">
                <div class="school-review__review-name">
                  Ольга Петровна
                </div>
                <div class="school-review__review-date">
                  12 октября 2023 года
                </div>
              </div>
              <div class="school-review__review-source">
                yandex.ru
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import Bubbles from '@/components/atoms/Bubbles.vue';
import Icon from '@/components/atoms/Icon.vue';
import Rate from '@/components/atoms/Rate.vue';
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
const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};
const title = `Школа ${itemLinkSchool.value?.name}: ${itemLinkSchool.value?.amount_courses?.all || 0} ${plural(itemLinkSchool.value?.amount_courses?.all || 0, conditions)} (${itemLinkSchool.value?.rating}⭐️) от учеников проходивших курсы`;
const description = `Список проверенных отзывов о школе ${itemLinkSchool.value?.name} от реальных учеников, проходивших курсы. ${itemLinkSchool.value?.amount_courses?.all || 0} ${plural(itemLinkSchool.value?.amount_courses?.all || 0, conditions)} со средней оценкой ${itemLinkSchool.value?.rating}⭐️`;

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
