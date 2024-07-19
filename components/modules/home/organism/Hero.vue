<template>
  <Hero class="mt-12 mb-24 mb-12-sm">
    <template #title>
      С нами найдешь курс быстрее
    </template>
    <template #description>
      Находи онлайн-курсы быстрее, используя умный поиск.
    </template>
    <template #tags>
      <Tags
        v-if="listDirections"
      >
        <Tag
          v-for="(item, key) in listDirections"
          :key="key"
          :to="item.path"
          border="grey2"
          bck-hover="blue1"
        >
          {{ item.label }}
        </Tag>
      </Tags>
    </template>
    <template #actions>
      <Button
        to="/courses"
        icon
        link="nuxt-link"
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
      <template v-if="heroImage === 1">
        <img
          src="@/assets/images/hero/1.webp"
          alt="С нами найдешь курс быстрее"
          :width="619"
          :height="641"
        />
      </template>
      <template v-else-if="heroImage === 2">
        <img
          src="@/assets/images/hero/2.webp"
          alt="С нами найдешь курс быстрее"
          :width="621"
          :height="641"
        />
      </template>
      <template v-else>
        <img
          src="@/assets/images/hero/3.webp"
          alt="С нами найдешь курс быстрее"
          :width="622"
          :height="641"
        />
      </template>
    </template>
  </Hero>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Hero from '@/components/modules/home/molecules/Hero.vue';
import Tags from '@/components/molecules/Tags.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import type IMenu from '@/interfaces/menu';
import direction from '@/stores/direction';

// const heroImage = ref(Math.round(Math.random() * (3 - 1) + 1));

const heroImage = ref(1);

const { directions } = storeToRefs(direction());
const listDirections = ref<IMenu[]>();

try {
  listDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}
</script>
