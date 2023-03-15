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
        <span v-html="itemLinkCategory.text" />
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
        <span v-html="itemLinkDirection.text" />
      </template>
      <template
        v-if="itemLinkDirection.categories"
        #section
      >
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
          Сейчас в тренде
        </div>
      </template>
      <template
        v-if="itemLinkDirection.categories"
        #tags
      >
        <Tags>
          <Tag
            v-for="(item, key) in itemLinkDirection.categories"
            :key="key"
            :to="`/courses/category/${item.link}`"
            bck="white"
            shadow
          >
            {{ item.name }}
          </Tag>
        </Tags>
      </template>
    </CatalogHeader>
    <template
      v-else-if="itemLinkProfession"
    >
      <CatalogHeader
        v-if="itemLinkProfession && itemLinkProfession.text"
      >
        <template #title>
          {{ itemLinkProfession.header || itemLinkProfession.name }}
        </template>
        <template
          v-if="itemLinkProfession.text"
          #description
        >
          <span v-html="itemLinkProfession.text" />
        </template>
      </CatalogHeader>
      <div v-else>
        <div class="content">
          <h1 class="title title--1">
            {{ itemLinkProfession.header || itemLinkProfession.name }}
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
        <span v-html="itemLinkSchool.text" />
      </template>
      <template
        v-if="itemLinkSchool.rating"
        #rating
      >
        {{ itemLinkSchool.rating }}
      </template>
      <!--
      <template #reviews>
        <nuxt-link to="/">
          1236 отзывов
        </nuxt-link>
      </template>
      -->
      <template
        v-if="itemLinkSchool.image_site_id?.path"
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
        v-if="itemLinkSchool.image_site_id.path"
        #action
      >
        <Button
          :to="itemLinkSchool.site"
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
          {{ itemLinkSkill.header || itemLinkSkill.name }}
        </template>
        <template
          v-if="itemLinkSkill.text"
          #description
        >
          <span v-html="itemLinkSkill.text" />
        </template>
      </CatalogHeader>
      <div v-else>
        <div class="content">
          <h1 class="title title--1">
            {{ itemLinkSkill.header || itemLinkSkill.name }}
          </h1>
        </div>
      </div>
    </template>
    <template
      v-else-if="itemLinkTool"
    >
      <CatalogHeader
        v-if="itemLinkTool && itemLinkTool.text"
      >
        <template #title>
          {{ itemLinkTool.header || itemLinkTool.name }}
        </template>
        <template
          v-if="itemLinkTool.text"
          #description
        >
          <span v-html="itemLinkTool.text" />
        </template>
      </CatalogHeader>
      <div v-else>
        <div class="content">
          <h1 class="title title--1">
            {{ itemLinkTool.header || itemLinkTool.name }}
          </h1>
        </div>
      </div>
    </template>
    <div v-else>
      <div class="content">
        <h1 class="title title--1">
          Курсы онлайн от Courselandia
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import Button from '@/components/atoms/Button.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import Tags from '@/components/molecules/Tags.vue';
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
</script>
