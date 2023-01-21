<template>
  <div class="content">
    <Hero class="mt-15 mb-30 mb-15-sm">
      <template #title>
        С нами находить курсы легче
      </template>
      <template #description>
        Интересные подборки, отзывы и рейтинги в одном месте
      </template>
      <template #tags>
        <Tags>
          <Tag to="/courses/programmer">
            Программирование
          </Tag>
          <Tag to="/courses/marketing">
            Маркетинг
          </Tag>
          <Tag to="/courses/marketing">
            Дизайн
          </Tag>
          <Tag to="/courses/marketing">
            Бизнес и управление
          </Tag>
          <Tag to="/courses/marketing">
            Аналитика
          </Tag>
          <Tag to="/courses/marketing">
            Игры
          </Tag>
        </Tags>
      </template>
      <template #actions>
        <Button
          to="/courses"
          icon
        >
          Каталог курсов
          <template #icon>
            <Icon
              name="link-to"
              color="white"
              :size="[13, 13]"
            />
          </template>
        </Button>
      </template>
      <template #media>
        <img src="@/assets/images/hero/1.svg" alt="С нами находить курсы легче" />
      </template>
    </Hero>

    <Brands class="mb-50 mb-15-sm" />

    <h1 class="title title--1 title--center-mobil">
      Популярные направления
    </h1>
    <Directions class="mb-50 mb-15-sm">
      <template
        v-for="(item, key) in directions"
        :key="key"
      >
        <Direction
          :image="item.image.default"
          :amount="item.amount"
          :label="item.label"
          :link="item.link"
        />
      </template>
    </Directions>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Direction from '@/components/molecules/Direction.vue';
import Directions from '@/components/molecules/Directions.vue';
import Hero from '@/components/molecules/Hero.vue';
import Tags from '@/components/molecules/Tags.vue';
import Brands from '@/components/organism/Brands.vue';
import IMenu from '@/interfaces/menu';

const directions = ref<IMenu[]>(
  [
    {
      label: 'Все курсы',
      link: '/courses',
      amount: 10,
      image: await import('@/assets/images/directions/all.svg'),
    },
    {
      label: 'Программирование',
      link: '/courses/programmirovanie',
      amount: 20,
      image: await import('@/assets/images/directions/programmirovanie.svg'),
    },
    {
      label: 'Маркетинг',
      link: '/marketings',
      amount: 30,
      image: await import('@/assets/images/directions/marketing.svg'),
    },
    {
      label: 'Дизайн',
      link: '/marketings',
      amount: 8,
      image: await import('@/assets/images/directions/dizayn.svg'),
    },
    {
      label: 'Бизнес и управление',
      link: '/buisness',
      amount: 4,
      image: await import('@/assets/images/directions/biznes-i-upravlenie.svg'),
    },
    {
      label: 'Аналитика',
      link: '/analitics',
      amount: 6,
      image: await import('@/assets/images/directions/analitika.svg'),
    },
    {
      label: 'Игры',
      link: '/analitics',
      amount: 7,
      image: await import('@/assets/images/directions/igri.svg'),
    },
    {
      label: 'Другие профессии',
      link: '/others',
      amount: 9,
      image: await import('@/assets/images/directions/drugie-professii.svg'),
    },
  ],
);
</script>
