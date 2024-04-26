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
                  v-for="(itm, indexDirection) in menuCourses"
                  :key="indexDirection"
                  :class="`dropdowns__direction ${index === indexDirection ? 'dropdowns__direction--current' : ''}`"
                  @click="onClickDirection(indexDirection)"
                  @keyup="onClickDirection(indexDirection)"
                >
                  {{ itm.label }}
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
                      :image="item.image?.default"
                      :amount="item.amount"
                      :label="item.label"
                      :link="item.path"
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
                    :to="menuCourses[index].path"
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
                    :items="menuCourses[index].children || []"
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
                  Изучайте курсы онлайн-школ, сравнивайте их
                  и найдите тот, который лучше всего подходит для вас.
                </div>
                <div
                  v-if="stat"
                  class="dropdowns__statistics"
                >
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
                      {{ stat.amountCourses }}
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
                      {{ stat.amountTeachers }}
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
                v-if="listSchools"
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
                  Все отзывы о школах
                </div>
                <div class="dropdowns__description">
                  Изучите реальные отзывы тех, кто уже обучался в онлайн-школах,
                  сравнивайте курсы и найдите тот, что подходит вам лучше всего!
                </div>
                <div
                  v-if="stat"
                  class="dropdowns__statistics"
                >
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
                      {{ stat.amountReviews }}
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
                      {{ stat.amountSchools }}
                    </div>
                  </div>
                </div>
                <div class="dropdowns__button">
                  <Button
                    to="/reviews"
                    @click="onClick"
                  >
                    Все отзывы
                  </Button>
                </div>
              </div>
            </div>
            <div class="dropdowns__side dropdowns__side--right">
              <ListSchoolReviews
                v-if="listSchoolReviews"
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
import { storeToRefs } from 'pinia';
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';

import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import Direction from '@/components/modules/home/atoms/Direction.vue';
import Directions from '@/components/modules/home/molecules/Directions.vue';
import AlphabeticList from '@/components/modules/layouts/general/molecules/AlphabeticList.vue';
import ListSchoolReviews from '@/components/modules/layouts/general/molecules/ListSchoolReviews.vue';
import ListSchools from '@/components/modules/layouts/general/molecules/ListSchools.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
import type IListSchoolReview from '@/interfaces/components/modules/reviewSchools/listSchoolReview';
import type IMenu from '@/interfaces/menu';
import course from '@/stores/course';
import direction from '@/stores/direction';
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

const emit = defineEmits({
  'update:menu': (_: string | null) => true,
});

const menuValue = ref<string | null>(menu.value);

watch(menuValue, () => {
  emit('update:menu', menuValue.value);
});

watch(menu, () => {
  menuValue.value = menu.value;
});

const index = ref(0);

const { directions } = storeToRefs(direction());
const { stat } = storeToRefs(course());
const listDirections = ref<IMenu[]>();

try {
  listDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}

const listDirectionsWithCategories = ref<IMenu[]>(listDirections.value || []);

const menuCourses = computed<IMenu[]>(() => [
  {
    label: 'Полный каталог',
    path: '/courses',
    children: listDirections.value,
  },
  ...listDirectionsWithCategories.value,
]);

const { schools } = storeToRefs(school());
const listSchools = ref<IMenu[]>(schoolsToMenu(schools.value));
const listSchoolReviews = ref<IListSchoolReview[]>(schoolsToSchoolReviews(schools.value));

const onClickDirection = (indx: number): void => {
  index.value = indx;
};

const onClick = (): void => {
  menuValue.value = null;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/dropdowns";
</style>
