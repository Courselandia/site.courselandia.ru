<template>
  <div class="menu-top-mobile">
    <template v-if="!menu">
      <div
        class="menu-top-mobile__item"
        @click="onClick('courses')"
        @keydown="onClick('courses')"
      >
        <div class="menu-top-mobile__label">
          Курсы
        </div>
        <Icon
          name="arrow-thin-right"
          color="grey3"
          :size="[7, 13]"
        />
      </div>
      <div
        class="menu-top-mobile__item"
        @click="onClick('schools')"
        @keydown="onClick('schools')"
      >
        <div class="menu-top-mobile__label">
          Школы
        </div>
        <Icon
          name="arrow-thin-right"
          color="grey3"
          :size="[7, 13]"
        />
      </div>
      <div
        class="menu-top-mobile__item"
        @click="onClick('reviews')"
        @keydown="onClick('reviews')"
      >
        <div class="menu-top-mobile__label">
          Отзывы о школах
        </div>
        <Icon
          name="arrow-thin-right"
          color="grey3"
          :size="[7, 13]"
        />
      </div>
      <nuxt-link
        class="menu-top-mobile__item"
        to="/reviews"
      >
        Блог
      </nuxt-link>
    </template>
    <template v-else-if="menu === 'courses'">
      <template v-if="direction === null">
        <div
          class="menu-top-mobile__item menu-top-mobile__item--back"
          @click="onClickBackRemoveMenu()"
          @keydown="onClickBackRemoveMenu()"
        >
          <Icon
            name="arrow-long-left"
            color="blue2"
            :size="[24, 16]"
          />
          <div class="menu-top-mobile__label">
            Курсы
          </div>
        </div>

        <div
          v-for="(item, key) in menuCourses"
          :key="key"
          class="menu-top-mobile__item"
          @click="onClickDirection(key)"
          @keydown="onClickDirection(key)"
        >
          <div class="menu-top-mobile__label">
            {{ item.label }}
          </div>
          <Icon
            name="arrow-thin-right"
            color="grey3"
            :size="[7, 13]"
          />
        </div>
      </template>
      <template v-else>
        <div
          class="menu-top-mobile__item menu-top-mobile__item--back"
          @click="onClickBackRemoveDirection()"
          @keydown="onClickBackRemoveDirection()"
        >
          <Icon
            name="arrow-long-left"
            color="blue2"
            :size="[24, 16]"
          />
          <div class="menu-top-mobile__label">
            {{ menuCourses[direction].label }}
          </div>
        </div>
        <div
          v-for="(item, key) in menuCourses[direction].children"
          :key="key"
          class="menu-top-mobile__item"
          @click="onClickLink(item.link)"
          @keydown="onClickLink(item.link)"
        >
          {{ item.label }}
        </div>
      </template>
    </template>
    <template v-else-if="menu === 'schools'">
      <div
        class="menu-top-mobile__item menu-top-mobile__item--back"
        @click="onClickBackRemoveMenu()"
        @keydown="onClickBackRemoveMenu()"
      >
        <Icon
          name="arrow-long-left"
          color="blue2"
          :size="[24, 16]"
        />
        <div class="menu-top-mobile__label">
          Школы
        </div>
      </div>
      <div
        v-for="(item, key) in listSchools"
        :key="key"
        class="menu-top-mobile__item"
        @click="onClickLink(item.link)"
        @keydown="onClickLink(item.link)"
      >
        {{ item.label }}
      </div>
    </template>
    <template v-else-if="menu === 'reviews'">
      <div
        class="menu-top-mobile__item menu-top-mobile__item--back"
        @click="onClickBackRemoveMenu()"
        @keydown="onClickBackRemoveMenu()"
      >
        <Icon
          name="arrow-long-left"
          color="blue2"
          :size="[24, 16]"
        />
        <div class="menu-top-mobile__label">
          Отзывы о школах
        </div>
      </div>
      <div
        v-for="(item, key) in listSchoolReviews"
        :key="key"
        class="menu-top-mobile__item menu-top-mobile__item--review"
        @click="onClickLink(item.link)"
        @keydown="onClickLink(item.link)"
      >
        <div class="menu-top-mobile__star">
          <Icon
            name="star"
            color="blue2"
            :size="[16, 16]"
          />
        </div>
        <div class="menu-top-mobile__rating">
          {{ item.rating }}
        </div>
        <div class="menu-top-mobile__label">
          {{ item.label }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';

import Icon from '@/components/atoms/Icon.vue';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import IMenu from '@/interfaces/menu';

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const {
  show,
} = toRefs(props);

const showValue = ref(show.value);

const emit = defineEmits({
  'update:show': (_: Boolean) => true,
});

watch(showValue, () => {
  emit('update:show', showValue.value);
});

const router = useRouter();
const menu = ref<string | null>(null);
const direction = ref<number | null>(null);

const onClick = (name: string): void => {
  menu.value = name;
};

const onClickBackRemoveMenu = (): void => {
  menu.value = null;
};

const onClickDirection = (name: number): void => {
  direction.value = name;
};

const onClickBackRemoveDirection = (): void => {
  direction.value = null;
};

const menuCourses = ref<IMenu[]>(
  [
    {
      label: 'Полный каталог',
      link: '/courses',
      children: [
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
    },
    {
      label: 'Программирование',
      link: '/courses/programmirovanie',
      children: [
        {
          label: '1C разработка',
          link: '/courses',
        },
        {
          label: 'С# - разработка',
          link: '/courses',
        },
        {
          label: 'Data Engineering',
          link: '/courses',
        },
        {
          label: 'Data Science',
          link: '/courses',
        },
        {
          label: 'DevOps Engineering',
          link: '/courses',
        },
        {
          label: 'Frontend-разработка',
          link: '/courses',
        },
        {
          label: 'IT - рекрутинг',
          link: '/courses',
        },
        {
          label: 'Java - разработка',
          link: '/courses',
        },
        {
          label: 'JavaScript - разработка',
          link: '/courses',
        },
        {
          label: 'Python - разработка',
          link: '/courses',
        },
        {
          label: 'Performance-маркетинг',
          link: '/courses',
        },
        {
          label: 'Fashion-дизайн',
          link: '/courses',
        },
        {
          label: 'Деловым переговорам и коммуникация',
          link: '/courses',
        },
        {
          label: 'ETL development',
          link: '/courses',
        },
        {
          label: 'Data Engineering',
          link: '/courses',
        },
      ],
    },
    {
      label: 'Маркетинг',
      link: '/courses',
      children: [
        {
          label: '1C разработка',
          link: '/courses',
        },
        {
          label: 'С# - разработка',
          link: '/courses',
        },
        {
          label: 'Data Engineering',
          link: '/courses',
        },
        {
          label: 'Data Science',
          link: '/courses',
        },
        {
          label: 'DevOps Engineering',
          link: '/courses',
        },
        {
          label: 'Frontend-разработка',
          link: '/courses',
        },
        {
          label: 'IT - рекрутинг',
          link: '/courses',
        },
        {
          label: 'Java - разработка',
          link: '/courses',
        },
        {
          label: 'JavaScript - разработка',
          link: '/courses',
        },
        {
          label: 'Python - разработка',
          link: '/courses',
        },
      ],
    },
    {
      label: 'Дизайн',
      link: '/courses',
      children: [
        {
          label: '1C разработка',
          link: '/courses',
        },
        {
          label: 'С# - разработка',
          link: '/courses',
        },
        {
          label: 'Data Engineering',
          link: '/courses',
        },
        {
          label: 'Data Science',
          link: '/courses',
        },
        {
          label: 'DevOps Engineering',
          link: '/courses',
        },
        {
          label: 'Frontend-разработка',
          link: '/courses',
        },
        {
          label: 'IT - рекрутинг',
          link: '/courses',
        },
        {
          label: 'Java - разработка',
          link: '/courses',
        },
        {
          label: 'JavaScript - разработка',
          link: '/courses',
        },
        {
          label: 'Python - разработка',
          link: '/courses',
        },
      ],
    },
    {
      label: 'Бизнес и управление',
      link: '/courses',
      children: [
        {
          label: '1C разработка',
          link: '/courses',
        },
        {
          label: 'С# - разработка',
          link: '/courses',
        },
      ],
    },
  ],
);

const listSchools = ref<IMenu[]>(
  [
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
    },
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
    },
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
    },
  ],
);

const listSchoolReviews = ref<IListSchoolReview[]>(
  [
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4.5,
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
      reviews: 3000,
      rating: 3.5,
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'XYZ School',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Среда обучения',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Level One',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
    {
      label: 'Нетология',
      link: '/courses/level-one',
      reviews: 2000,
      rating: 4,
    },
  ],
);

const onClickLink = (link: string): void => {
  router.push(link);
  showValue.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/menuTopMobile.scss";
</style>
