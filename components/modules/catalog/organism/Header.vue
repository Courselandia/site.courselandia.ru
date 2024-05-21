<template>
  <div class="header">
    <Header
      v-if="itemLinkCategory"
    >
      <template #title>
        {{ itemLinkCategory.header || itemLinkCategory.name }}
      </template>
      <template
        v-if="itemLinkCategory.text"
        #description
      >
        <Reducer>
          <span v-html="itemLinkCategory.text" />
        </Reducer>
      </template>
      <template
        v-if="itemLinkCategory.directions"
        #section
      >
        <div class="header__fire" />
        <div class="header__label">
          Сейчас в тренде
        </div>
      </template>
      <template
        v-if="itemLinkCategory.directions"
        #tags
      >
        <Tags>
          <Tag
            v-for="(item, key) in itemLinkCategory.directions"
            :key="key"
            :to="`/courses/direction/${item.link}`"
            bck="white"
            shadow
          >
            {{ item.name }}
          </Tag>
        </Tags>
      </template>
    </Header>
    <Header
      v-else-if="itemLinkDirection"
    >
      <template #title>
        {{ itemLinkDirection.header || itemLinkDirection.name }}
      </template>
      <template
        v-if="itemLinkDirection.text"
        #description
      >
        <Reducer>
          <span v-html="itemLinkDirection.text" />
        </Reducer>
      </template>
      <template
        v-if="itemLinkDirection?.categories"
        #section
      >
        <div class="header__fire" />
        <div class="header__label">
          Сейчас в тренде
        </div>
      </template>
      <template
        v-if="itemLinkDirection?.categories"
        #tags
      >
        <div class="header__desktop">
          <Carousel
            snap-align="end"
            wrap-around
          >
            <Slide
              v-for="(handful, key) in getHandfulTags(itemLinkDirection.categories, 20)"
              :key="key"
            >
              <Tags>
                <Tag
                  v-for="(item, handfulLey) in handful"
                  :key="handfulLey"
                  :to="`/courses/category/${item.link}`"
                  bck="white"
                >
                  {{ item.name }}
                </Tag>
              </Tags>
            </Slide>

            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!--noindex-->
        <ClientOnly>
          <div class="header__mobile">
            <Carousel
              snap-align="end"
              wrap-around
            >
              <Slide
                v-for="(handful, key) in getHandfulTags(itemLinkDirection.categories, 5)"
                :key="key"
              >
                <Tags>
                  <Tag
                    v-for="(item, handfulLey) in handful"
                    :key="handfulLey"
                    :to="`/courses/category/${item.link}`"
                    bck="white"
                  >
                    {{ item.name }}
                  </Tag>
                </Tags>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </ClientOnly>
        <!--/noindex-->
      </template>
    </Header>
    <template
      v-else-if="itemLinkProfession"
    >
      <Header
        v-if="itemLinkProfession?.text"
      >
        <template #title>
          {{ itemLinkProfession?.header || itemLinkProfession?.name }}
        </template>
        <template
          v-if="itemLinkProfession?.text"
          #description
        >
          <Reducer>
            <span v-html="itemLinkProfession.text" />
          </Reducer>
        </template>
      </Header>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkProfession?.header || itemLinkProfession?.name }}
          </h1>
        </div>
      </div>
    </template>
    <Header
      v-else-if="itemLinkSchool"
    >
      <template #title>
        {{ itemLinkSchool.header || itemLinkSchool.name }}
      </template>
      <template
        v-if="itemLinkSchool.text"
        #description
      >
        <Reducer>
          <span v-html="itemLinkSchool.text" />
        </Reducer>
      </template>
      <template
        v-if="itemLinkSchool?.rating"
        #rating
      >
        {{ Math.round(itemLinkSchool.rating * 100) / 100 }}
      </template>
      <template #reviews>
        <nuxt-link
          v-if="itemLinkSchool.amount_reviews"
          :to="`/reviews/${itemLinkSchool.link}`"
          prefetch
        >
          {{ itemLinkSchool.amount_reviews }}
          {{ plural(itemLinkSchool.amount_reviews, conditions) }}
        </nuxt-link>
      </template>
      <template
        v-if="itemLinkSchool?.image_site_id?.path"
        #image
      >
        <img
          :src="itemLinkSchool.image_site_id.path"
          :alt="itemLinkSchool.name"
          :title="itemLinkSchool.name"
        />
      </template>
      <template
        v-if="itemLinkSchool.amount_teachers"
        #teachers
      >
        {{ itemLinkSchool.amount_teachers }}
      </template>
      <template
        v-if="itemLinkSchool?.image_site_id?.path"
        #action
      >
        <Button
          v-if="itemLinkSchool.referral || itemLinkSchool.site"
          :to="itemLinkSchool.referral || itemLinkSchool.site"
          link="link"
          target="_blank"
          rel="nofollow noopener noreferrer"
          @click="onClickToSchool"
        >
          Перейти на сайт
        </Button>
      </template>
    </Header>
    <template
      v-else-if="itemLinkSkill"
    >
      <Header
        v-if="itemLinkSkill?.text"
      >
        <template #title>
          {{ itemLinkSkill?.header || itemLinkSkill?.name }}
        </template>
        <template
          v-if="itemLinkSkill?.text"
          #description
        >
          <Reducer>
            <span v-html="itemLinkSkill.text" />
          </Reducer>
        </template>
      </Header>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkSkill?.header || itemLinkSkill?.name }}
          </h1>
        </div>
      </div>
    </template>
    <HeaderTeacher
      v-else-if="itemLinkTeacher"
      :teacher="itemLinkTeacher"
    />
    <template
      v-else-if="itemLinkTool"
    >
      <Header
        v-if="itemLinkTool?.text"
      >
        <template #title>
          {{ itemLinkTool?.header || itemLinkTool?.name }}
        </template>
        <template
          v-if="itemLinkTool?.text"
          #description
        >
          <Reducer>
            <span v-html="itemLinkTool.text" />
          </Reducer>
        </template>
      </Header>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkTool?.header || itemLinkTool?.name }}
          </h1>
        </div>
      </div>
    </template>
    <template
      v-else-if="itemLinkSection"
    >
      <Header
        v-if="itemLinkSection?.text"
      >
        <template #title>
          {{ itemLinkSection?.header || itemLinkSection?.name }}
        </template>
        <template
          v-if="itemLinkSection?.text"
          #description
        >
          <Reducer>
            <span v-html="itemLinkSection.text" />
          </Reducer>
        </template>
      </Header>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkSection?.header || itemLinkSection?.name }}
          </h1>
        </div>
      </div>
    </template>
    <Header
      v-else
    >
      <template #title>
        Курсы онлайн от Courselandia
      </template>
      <template #description>
        <Reducer>
          <p>
            IT курсы с нуля давно доказали свою эффективность.
            Хорошо зная рынок услуг онлайн-образования в нашей стране,
            проводя его систематический мониторинг и изучение, мы подобрали
            для вас перечень IT курсов онлайн, которые обеспечивают учащимся
            наилучший результат. Многие люди уже успешно прошли их и в
            настоящее время стали успешными специалистами с отличными
            перспективами карьерного роста.
          </p>
          <p>
            <nuxt-link to="/courses/direction/programmirovanie" class="link" prefetch>
              Все онлайн-курсы</nuxt-link> рассортированы по категориям.
            Это позволяет быстро найти нужное направление обучения. Подбор
            курсов можно осуществить по профессии, например, курсы бизнес
            аналитика или
            <nuxt-link to="/courses/profession/fullstackdizayner" class="link" prefetch>
              Fullstack дизайнер</nuxt-link>, стоимости обучения,
            уровню, рейтингу и т. д.
          </p>
        </Reducer>
      </template>
      <template #section>
        <div class="header__fire" />
        <div class="header__label">
          Сейчас в тренде
        </div>
      </template>
      <template #tags>
        <div class="header__desktop">
          <Carousel
            snap-align="end"
            wrap-around
          >
            <Slide
              v-for="(handful, key) in getHandfulTags(popularTags, 15)"
              :key="key"
            >
              <Tags>
                <Tag
                  v-for="(item, handfulLey) in handful"
                  :key="handfulLey"
                  :to="item.link"
                  bck="white"
                >
                  {{ item.name }}
                </Tag>
              </Tags>
            </Slide>

            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!--noindex-->
        <ClientOnly>
          <div class="header__mobile">
            <Carousel
              snap-align="end"
              wrap-around
            >
              <Slide
                v-for="(handful, key) in getHandfulTags(popularTags, 5)"
                :key="key"
              >
                <Tags>
                  <Tag
                    v-for="(item, handfulLey) in handful"
                    :key="handfulLey"
                    :to="item.link"
                    bck="white"
                  >
                    {{ item.name }}
                  </Tag>
                </Tags>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </ClientOnly>
        <!--/noindex-->
      </template>
    </Header>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-extraneous-dependencies
import 'vue3-carousel/dist/carousel.css';

import { storeToRefs } from 'pinia';
import {
  ref,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Carousel,
  Pagination,
  Slide,
} from 'vue3-carousel';

import Button from '@/components/atoms/Button.vue';
import Reducer from '@/components/atoms/Reducer.vue';
import Tag from '@/components/atoms/Tag.vue';
import Header from '@/components/modules/catalog/molecules/Header.vue';
import HeaderTeacher from '@/components/modules/catalog/molecules/HeaderTeacher.vue';
import Tags from '@/components/molecules/Tags.vue';
import plural from '@/helpers/plural';
import track from '@/helpers/track';
import type ITag from '@/interfaces/components/atoms/tag';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
import section from '@/stores/section';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';

const { itemLinkCategory } = storeToRefs(category());
const { itemLinkDirection } = storeToRefs(direction());
const { itemLinkProfession } = storeToRefs(profession());
const { itemLinkSchool } = storeToRefs(school());
const { itemLinkSkill } = storeToRefs(skill());
const { itemLinkTeacher } = storeToRefs(teacher());
const { itemLinkTool } = storeToRefs(tool());
const { itemLinkSection } = storeToRefs(section());

const getHandfulTags = (
  items: Array<ICategoryLink | ITag>,
  totalInHandful: number,
): Array<Array<ICategoryLink | ITag>> => {
  const result: Array<Array<ICategoryLink | ITag>> = [];

  for (let i = 0; i < items.length; i++) {
    const indexCurrent = Math.floor(i / totalInHandful);

    if (!result[indexCurrent]) {
      result[indexCurrent] = [];
    }

    result[indexCurrent][result[indexCurrent].length] = items[i];
  }

  return result;
};

const popularTags = ref<Array<ITag>>([
  {
    name: 'Нейронные сети',
    link: '/courses/skill/razrabotka-neyrosetey',
  },
  {
    name: 'Программирование',
    link: '/courses/direction/programmirovanie',
  },
  {
    name: 'Разработка мобильных приложений',
    link: '/courses/category/razrabotka-mobilnih-prilozheniy',
  },
  {
    name: 'GeekBrains',
    link: '/courses/school/geekbrains',
  },
  {
    name: 'Java',
    link: '/courses/tool/java',
  },
  {
    name: 'Нетология',
    link: '/courses/school/netologiya',
  },
  {
    name: 'Data Engineering',
    link: '/courses/category/data-engineering',
  },
  {
    name: 'Дизайн',
    link: '/courses/direction/dizayn',
  },
  {
    name: 'Игры',
    link: '/courses/direction/igri',
  },
  {
    name: 'Skillbox',
    link: '/courses/school/skillbox',
  },
  {
    name: 'PHP',
    link: '/courses/tool/php',
  },
  {
    name: 'XYZ School',
    link: '/courses/school/xyz-school',
  },
  {
    name: 'Интернет-маркетинг',
    link: '/courses/category/internetmarketing',
  },
  {
    name: 'Frontend-разработка',
    link: '/courses/category/frontendrazrabotka',
  },
  {
    name: 'Аналитика',
    link: '/courses/direction/analitika',
  },
  {
    name: 'Бизнес и управление',
    link: '/courses/category/data-science',
  },
  {
    name: 'Python',
    link: '/courses/tool/python',
  },
  {
    name: 'Веб-разработка',
    link: '/courses/category/vebrazrabotka',
  },
  {
    name: 'UX/UI-дизайнер',
    link: '/courses/profession/uxuidizayner',
  },
  {
    name: 'Project-менеджер',
    link: '/courses/profession/projectmenedzher',
  },
  {
    name: 'Тестирование ПО',
    link: '/courses/category/testirovanie-po',
  },
]);

const conditions = {
  0: 'отзывов',
  1: 'отзыв',
  '2+': 'отзыва',
  '5+': 'отзывов',
};

const onClickToSchool = (): void => {
  track('school');
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/organism/header";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/components/molecules/carousel";
</style>
