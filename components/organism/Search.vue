<template>
  <div
    v-click-outside="onClickOutside"
    :class="`search ${nameClass}`"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
    @focusin="onMouseOver"
    @focusout="onMouseLeave"
  >
    <div class="search__item">
      <div class="search__icon search__icon--loop">
        <Icon
          name="loop"
          :color="focus ? 'blue2' : 'grey3'"
          :size="[20, 20]"
        />
      </div>
      <div class="search__input">
        <input
          v-model="query"
          type="text"
          name="query"
          class="search__element"
          placeholder="Чему вы хотите научиться?"
          autocomplete="off"
          @focusin="onFocusIn"
          @focusout="onFocusOut"
          @input="onInput"
        >
      </div>
      <div class="search__loader">
        <transition name="fade">
          <Loader
            v-if="loading"
            :active="loading"
            :color="focus ? 'blue2' : 'grey3'"
            size="tiny"
          />
        </transition>
      </div>
      <div class="search__icon search__icon--clean">
        <transition name="fade">
          <Icon
            v-if="focus || hover"
            name="close"
            :color="focus ? 'blue2' : 'grey3'"
            :size="[20, 20]"
            @click="onClean"
          />
        </transition>
      </div>
    </div>
    <div
      v-if="query && searching && total"
      class="search__results"
    >
      <div
        v-if="query && total"
        class="search__amount"
      >
        Найдено {{ total }} курсов
      </div>
      <div class="search__courses">
        <CourseSearchResult
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
          @click="onClickResult"
        />
      </div>
      <div
        v-if="total"
        class="search__action"
      >
        <nuxt-link
          :to="`/courses?search=${encodeURIComponent(query as string)}&sort=${ECourseSort.RELEVANCY}`"
          class="search__link"
          @click="onClickResult"
        >
          <div>
            Смотреть все
          </div>
          <Icon
            name="link-to"
            color="blue2"
            :size="[9, 9]"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';

import { apiReadSearchedCourses } from '@/api/course';
import Icon from '@/components/atoms/Icon.vue';
import Loader from '@/components/atoms/Loader.vue';
import CourseSearchResult from '@/components/molecules/CourseSearchResult.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ECourseSort from '@/enums/components/molecules/courseSort';
import ICourse from '@/interfaces/components/molecules/course';

const courses = ref<ICourse[]>([]);
const total = ref(0);
const query = ref<string>();
const hover = ref(false);
const focus = ref(false);
const searching = ref(false);
const loading = ref(false);

const nameClass = computed(() => {
  const classes = [];

  if (hover.value) {
    classes.push('search--hover');
  }

  if (focus.value) {
    classes.push('search--focus');
  }

  return classes.join(' ');
});

const onMouseOver = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};

const onFocusIn = (): void => {
  focus.value = true;
};

const onFocusOut = (): void => {
  focus.value = false;
};

const onClean = (): void => {
  query.value = '';
};

const onClickOutside = (): void => {
  searching.value = false;
  total.value = 0;
  courses.value = [];
  query.value = '';
};

let timer: ReturnType<typeof setTimeout>;
const onInput = (): void => {
  if (timer) {
    clearTimeout(timer);
  }

  if (query.value) {
    timer = setTimeout(async () => {
      searching.value = true;
      loading.value = true;

      try {
        const result = await apiReadSearchedCourses(
          query.value || '',
          10,
        );

        if (result?.courses) {
          courses.value = coursesStoreToCoursesComponent(result?.courses);
          total.value = result.total || 0;
        } else {
          courses.value = [];
        }
      } catch (error: any) {
        courses.value = [];
        total.value = 0;

        console.error(error.message);
      }

      loading.value = false;
    }, 350);
  } else {
    courses.value = [];
    total.value = 0;
  }
};

const onClickResult = (): void => {
  courses.value = [];
  total.value = 0;
  query.value = '';
  loading.value = false;
  searching.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/search.scss";
</style>
