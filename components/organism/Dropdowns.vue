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
                      @click="onClick"
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
                    @click="onClick"
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
                    @click="onClick"
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
                  Изучите реальные отзывы тех, кто уже обучался в онлайн-школах,
                  сравнивайте курсы и найдите тот, что подходит вам лучше всего!
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
                      {{ totalCourses }}
                    </div>
                  </div>
                </div>
                <div class="dropdowns__button">
                  <Button
                    to="/courses"
                    @click="onClick"
                  >
                    Все школы
                  </Button>
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <ListSchools
                :schools="listSchools"
                @click="onClick"
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
                    </div>
                  </div>
                </div>
                <div class="dropdowns__button">
                  <Button
                    to="/"
                    @click="onClick"
                  >
                    Все отзывы
                  </Button>
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <ListSchoolReviews
                :schools="listSchoolReviews"
                @click="onClick"
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
  computed,
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
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import IListSchoolReview from '@/interfaces/components/molecules/listSchoolReview';
import IMenu from '@/interfaces/menu';
import { IResponseItems } from '@/interfaces/response';
import IDirection from '@/interfaces/stores/course/direction';
import ISchool from '@/interfaces/stores/school/school';
import course from '@/stores/course';
import school from '@/stores/school';

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

const {
  readDirections,
} = course();

const {
  readSchools,
} = school();

const emit = defineEmits({
  'update:menu': (_: string | null) => true,
});

const config = useRuntimeConfig();
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

const directions = ref<IMenu[]>();
const directionsWithCategories = ref<IMenu[]>([]);

const menuCourses = computed<IMenu[]>(() => [
  {
    label: 'Полный каталог',
    link: '/courses',
    children: directions.value,
  },
  ...directionsWithCategories.value,
]);

const totalCourses = computed<number>(() => {
  let total = 0;

  menuCourses.value.forEach((item) => {
    total += item?.amount || 0;
  });

  return total;
});

const loadDirections = async ():
  Promise<IResponseItems<IDirection>> => readDirections(config.public.apiUrl, true, true);

try {
  const resultDirections = await useAsyncData('directionsWithCategoriesAndCount', async () => loadDirections());
  const result = resultDirections.data.value?.data;
  directions.value = await directionsToMenu(result, true);
  directionsWithCategories.value = await directionsToMenu(result);
} catch (error: any) {
  console.error(error.message);
}

const listSchools = ref<IMenu[]>([]);

const loadSchools = async ():
  Promise<IResponseItems<ISchool>> => readSchools(config.public.apiUrl);

try {
  const resultSchools = await useAsyncData('schools', async () => loadSchools());
  listSchools.value = schoolsToMenu(resultSchools.data.value?.data);
} catch (error: any) {
  console.error(error.message);
}

const listSchoolReviews = ref<IListSchoolReview[]>(
  [
    /*
    {
      label: 'Skillbox',
      link: '/courses/skillbox',
      reviews: 2000,
      rating: 4.5,
    },
     */
  ],
);

const onClickDirection = (indx: number): void => {
  index.value = indx;
};

const onClick = (): void => {
  menuValue.value = null;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/dropdowns.scss";
</style>
