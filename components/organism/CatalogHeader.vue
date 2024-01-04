<template>
  <div>
    <CatalogHeader
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
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
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
    </CatalogHeader>
    <CatalogHeader
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
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
          Сейчас в тренде
        </div>
      </template>
      <template
        v-if="itemLinkDirection?.categories"
        #tags
      >
        <div class="catalog-header__desktop">
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
          <div class="catalog-header__mobile">
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
    </CatalogHeader>
    <template
      v-else-if="itemLinkProfession"
    >
      <CatalogHeader
        v-if="itemLinkProfession && itemLinkProfession.text"
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
      </CatalogHeader>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkProfession?.header || itemLinkProfession?.name }}
          </h1>
        </div>
      </div>
    </template>
    <CatalogHeader
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
      <!--
      <template #reviews>
        <nuxt-link to="/">
          1236 отзывов
        </nuxt-link>
      </template>
      -->
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
      <!--
      <template #teachers>
        2300
      </template>
      -->
      <template
        v-if="itemLinkSchool?.image_site_id?.path"
        #action
      >
        <Button
          :to="itemLinkSchool.site as string"
          link="link"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Перейти на сайт
        </Button>
      </template>
    </CatalogHeader>
    <template
      v-else-if="itemLinkSkill"
    >
      <CatalogHeader
        v-if="itemLinkSkill && itemLinkSkill.text"
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
      </CatalogHeader>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkSkill?.header || itemLinkSkill?.name }}
          </h1>
        </div>
      </div>
    </template>
    <CatalogHeaderTeacher
      v-else-if="itemLinkTeacher"
      :teacher="itemLinkTeacher"
    />
    <template
      v-else-if="itemLinkTool"
    >
      <CatalogHeader
        v-if="itemLinkTool && itemLinkTool.text"
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
      </CatalogHeader>
      <div v-else>
        <div class="content mt-12">
          <h1 class="title title--1">
            {{ itemLinkTool?.header || itemLinkTool?.name }}
          </h1>
        </div>
      </div>
    </template>
    <CatalogHeader
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
            <nuxt-link to="/courses/direction/programmirovanie" class="link">
              Все онлайн-курсы</nuxt-link> рассортированы по категориям.
            Это позволяет быстро найти нужное направление обучения. Подбор
            курсов можно осуществить по профессии, например, курсы бизнес
            аналитика или
            <nuxt-link to="/courses/profession/fullstackdizayner" class="link">
              Fullstack дизайнер</nuxt-link>, стоимости обучения,
            уровню, рейтингу и т. д.
          </p>
        </Reducer>
      </template>
      <template #section>
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
          Сейчас в тренде
        </div>
      </template>
      <template #tags>
        <div class="catalog-header__desktop">
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
          <div class="catalog-header__mobile">
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
    </CatalogHeader>
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
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import CatalogHeaderTeacher from '@/components/molecules/CatalogHeaderTeacher.vue';
import Tags from '@/components/molecules/Tags.vue';
import type ITag from '@/interfaces/components/atoms/tag';
import type ICategoryLink from '@/interfaces/stores/course/categoryLink';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import school from '@/stores/school';
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
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/carousel.scss";
</style>
