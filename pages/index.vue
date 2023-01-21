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
    <Brands />
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Hero from '@/components/molecules/Hero.vue';
import Tags from '@/components/molecules/Tags.vue';
import Brands from '@/components/organism/Brands.vue';
</script>
