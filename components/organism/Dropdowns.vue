<template>
  <transition name="fade">
    <div
      v-if="menu"
      class="dropdowns"
    >
      <div class="dropdowns__dim">
        <div
          v-if="menu === 'courses'"
          class="dropdowns__item dropdowns__item--courses"
        >
          <div class="dropdowns__content content">
            <div class="dropdowns__side dropdowns__side--left">
              <div class="dropdowns__bck" />
              <div class="dropdowns__directions">
                <div
                  v-for="(direction, indexDirection) in menuCourses"
                  :key="indexDirection"
                  :class="`dropdowns__direction ${index === indexDirection ? 'dropdowns__direction--current' : ''}`"
                  @click="onClickDirection(indexDirection)"
                  @keyup="onClickDirection(indexDirection)"
                >
                  {{ direction.label }}
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <template
                v-if="index === 0"
              >
                <Directions>
                  <template
                    v-for="(item, key) in menuCourses[0].children"
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
              </template>
              <template
                v-else
              >
                <div class="dropdowns__actions">
                  <nuxt-link
                    :to="menuCourses[index].link"
                    class="dropdowns__action"
                  >
                    <div>
                      Все курсы направления
                    </div>
                    <Icon
                      name="link-to"
                      color="blue2"
                      :size="[9, 9]"
                    />
                  </nuxt-link>
                </div>
                <div class="dropdowns__list">
                  <AlphabeticList
                    :items="menuCourses[index].children"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
        <div
          v-else-if="menu === 'schools'"
          class="dropdowns__item dropdowns__item--schools"
        >
          <div class="dropdowns__content content">
            <div class="dropdowns__side dropdowns__side--left">
              <div class="dropdowns__bck" />
              <div class="dropdowns__info-block">
                <div class="dropdowns__title">
                  Все школы
                </div>
                <div class="dropdowns__description">
                  Ознакомьтесь с реальными отзывами тех, кто уже прошел обучение в онлайн-школах,
                  сравните курсы между собой и выберите то, что подходит именно вам!
                </div>
                <div class="dropdowns__statistics">
                  <div class="dropdowns__statistics-item">
                    <div class="dropdowns__statistics-icon">
                      <Icon
                        name="rhombus"
                        color="blue2"
                        :size="[26, 9]"
                      />
                    </div>
                    <div class="dropdowns__statistics-label">
                      Курсов
                    </div>
                    <div class="dropdowns__statistics-amount">
                      2163
                    </div>
                  </div>
                  <div class="dropdowns__statistics-item">
                    <div class="dropdowns__statistics-icon">
                      <Icon
                        name="rhombus"
                        color="blue2"
                        :size="[26, 9]"
                      />
                    </div>
                    <div class="dropdowns__statistics-label">
                      Преподавателей
                    </div>
                    <div class="dropdowns__statistics-amount">
                      863
                    </div>
                  </div>
                </div>
                <div class="dropdowns__button">
                  <Button to="/schools">
                    Все школы
                  </Button>
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <ListSchools
                :schools="listSchools"
              />
            </div>
          </div>
        </div>
        <div
          v-else-if="menu === 'reviews'"
          class="dropdowns__item dropdowns__item--reviews"
        >
          <div class="dropdowns__content content">
            <div class="dropdowns__side dropdowns__side--left">
              <div class="dropdowns__bck" />
              <div class="dropdowns__info-block">
                <div class="dropdowns__title">
                  Все школы
                </div>
                <div class="dropdowns__description">
                  Ознакомьтесь с реальными отзывами тех, кто уже прошел обучение в онлайн-школах,
                  сравните курсы между собой и выберите то, что подходит именно вам!
                </div>
                <div class="dropdowns__statistics">
                  <div class="dropdowns__statistics-item">
                    <div class="dropdowns__statistics-icon">
                      <Icon
                        name="rhombus"
                        color="blue2"
                        :size="[26, 9]"
                      />
                    </div>
                    <div class="dropdowns__statistics-label">
                      Отзывов
                    </div>
                    <div class="dropdowns__statistics-amount">
                      2163
                    </div>
                  </div>
                  <div class="dropdowns__statistics-item">
                    <div class="dropdowns__statistics-icon">
                      <Icon
                        name="rhombus"
                        color="blue2"
                        :size="[26, 9]"
                      />
                    </div>
                    <div class="dropdowns__statistics-label">
                      Школ
                    </div>
                    <div class="dropdowns__statistics-amount">
                      863
                    </div>
                  </div>
                </div>
                <div class="dropdowns__button">
                  <Button to="/reviews">
                    Все отзывы
                  </Button>
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <ListSchoolReviews
                :schools="listSchoolReviews"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import AlphabeticList from '@/components/molecules/AlphabeticList.vue';
import Direction from '@/components/molecules/Direction.vue';
import Directions from '@/components/molecules/Directions.vue';
import ListSchoolReviews from '@/components/molecules/ListSchoolReviews.vue';
import ListSchools from '@/components/molecules/ListSchools.vue';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import IMenu from '@/interfaces/menu';

const props = defineProps({
  menu: {
    type: String,
    required: false,
    default: null,
  },
});

const {
  menu,
} = toRefs(props);

const emit = defineEmits({
  'update:menu': (_: string | null) => true,
});

const menuValue = ref<string | null>(menu.value);

watch(menuValue, () => {
  emit('update:menu', menuValue.value);
});

watch(menu, () => {
  menuValue.value = menu.value;

  if (menuValue.value) {
    document.body.classList.add('scroll--no-scroll');
  } else {
    document.body.classList.remove('scroll--no-scroll');
  }
});

const index = ref(0);

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

const onClickDirection = (indx: number): void => {
  index.value = indx;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/dropdowns.scss";
</style>
