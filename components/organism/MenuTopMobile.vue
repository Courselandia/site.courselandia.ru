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
      <!--
      <nuxt-link
        style="display: none"
        class="menu-top-mobile__item"
        to="/blog"
      >
        Блог
      </nuxt-link>
      -->
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
          @click="onClickLink(item.path)"
          @keydown="onClickLink(item.path)"
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
      <template
        v-if="listSchools"
      >
        <div
          v-for="(item, key) in listSchools"
          :key="key"
          class="menu-top-mobile__item"
          @click="onClickLink(item.path)"
          @keydown="onClickLink(item.path)"
        >
          {{ item.label }}
        </div>
      </template>
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
        @click="onClickLink(`/reviews/${item.link}`)"
        @keydown="onClickLink(`/reviews/${item.link}`)"
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
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';

import { apiReadDirections } from '@/api/direction';
import { apiReadSchools } from '@/api/school';
import Icon from '@/components/atoms/Icon.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import schoolsToMenu from '@/converts/schoolsToMenu';
import schoolsToSchoolReviews from '@/converts/schoolsToSchoolReviews';
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

const config = useRuntimeConfig();
const showValue = ref(show.value);

const emit = defineEmits({
  'update:show': (_: Boolean) => true,
});

watch(show, () => {
  showValue.value = show.value;
});

watch(showValue, () => {
  emit('update:show', showValue.value);
});

const router = useRouter();
const menu = ref<string | null>(null);
const direction = ref<number | null>(null);
const schools = await apiReadSchools(config.public.apiUrl, config.public.development);
const directions = await apiReadDirections(config.public.apiUrl, config.public.development);

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

const listDirections = ref<IMenu[]>();

try {
  listDirections.value = await directionsToMenu(directions);
} catch (error: any) {
  console.error(error.message);
}

const listDirectionsWithCategories = ref<IMenu[]>([]);

try {
  listDirectionsWithCategories.value = await directionsToMenu(directions);
} catch (error: any) {
  console.error(error.message);
}

const menuCourses = computed<IMenu[]>(() => [
  {
    label: 'Полный каталог',
    path: '/courses',
    children: listDirections.value,
  },
  ...listDirectionsWithCategories.value,
]);

const listSchools = ref<IMenu[]>();

try {
  listSchools.value = schoolsToMenu(schools);
} catch (error: any) {
  console.error(error.message);
}

const listSchoolReviews = ref<IListSchoolReview[]>();

try {
  listSchools.value = schoolsToMenu(schools);
  listSchoolReviews.value = schoolsToSchoolReviews(schools);
} catch (error: any) {
  console.error(error.message);
}

const onClickLink = (link: string): void => {
  router.push(link);
  showValue.value = false;
  menu.value = null;
  direction.value = null;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/menuTopMobile.scss";
</style>
