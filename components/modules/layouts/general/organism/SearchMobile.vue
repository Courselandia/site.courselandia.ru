<template>
  <div class="search-mobile">
    <div
      class="search-mobile__icon"
      @click="onClick"
      @keydown="onClick"
    >
      <Icon
        name="loop"
        color="blue2"
        :size="[20, 20]"
      />
    </div>
    <ClientOnly>
      <teleport to="BODY">
        <transition name="fade">
          <div
            v-if="active"
            class="search-mobile__content"
          >
            <div class="search-mobile__query">
              <div class="search-mobile__icon search-mobile__icon--loop">
                <Icon
                  name="loop"
                  color="blue2"
                  :size="[20, 20]"
                />
              </div>
              <div class="search-mobile__input">
                <input
                  ref="inputRef"
                  :value="query"
                  type="text"
                  name="query"
                  class="search-mobile__element"
                  placeholder="Чему вы хотите научиться?"
                  autocomplete="off"
                  @input="e => query = e.target.value"
                >
              </div>
              <div class="search-mobile__loader">
                <transition name="fade">
                  <Loader
                    v-if="loading"
                    :active="loading"
                    color="blue2"
                    size="tiny"
                  />
                </transition>
              </div>
              <div class="search-mobile__icon search-mobile__icon--clean">
                <Icon
                  name="close"
                  color="grey3"
                  :size="[20, 20]"
                  @click="onClean"
                />
              </div>
            </div>
            <div class="search-mobile__result">
              <div
                v-if="query && total"
                class="search-mobile__amount"
              >
                Найдено {{ total }} курсов
              </div>
              <div class="search-mobile__courses">
                <CourseSearchResult
                  v-for="(course, index) in courses"
                  :key="index"
                  :course="course"
                  @click="onClickResult"
                />
              </div>
              <div
                v-if="total"
                class="search-mobile__action"
              >
                <nuxt-link
                  :to="`/courses?search=${encodeURIComponent(query as string)}&sort=${ECourseSort.RELEVANCY}`"
                  class="search-mobile__link"
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
        </transition>
      </teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import {
  onDeactivated,
  ref,
  watch,
} from 'vue';

import { apiReadSearchedCourses } from '@/api/course';
import Icon from '@/components/atoms/Icon.vue';
import Loader from '@/components/atoms/Loader.vue';
import CourseSearchResult from '@/components/modules/layouts/general/molecules/CourseSearchResult.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ECourseSort from '@/enums/components/molecules/courseSort';
import type ICourse from '@/interfaces/components/modules/course';

const courses = ref<ICourse[]>([]);
const total = ref(0);
const active = ref(false);
const query = ref<string>();
const loading = ref(false);
const inputRef = ref<HTMLElement | null>(null);

watch(active, () => {
  if (active.value) {
    document.body.classList.add('scroll--no-scroll');

    window.setTimeout(() => {
      inputRef.value?.focus();
    }, 100);
  } else {
    document.body.classList.remove('scroll--no-scroll');
  }
});

const onClick = (): void => {
  active.value = true;
};

const onClean = (): void => {
  query.value = '';
  active.value = false;
};

let timer: ReturnType<typeof setTimeout>;

const search = (): void => {
  if (timer) {
    clearTimeout(timer);
  }

  if (query.value) {
    timer = setTimeout(async () => {
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

watch(query, () => {
  search();
});

const onClickResult = (): void => {
  active.value = false;
  courses.value = [];
  total.value = 0;
  query.value = '';
  loading.value = false;
};

onDeactivated(() => {
  document.body.classList.remove('scroll--no-scroll');
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/searchMobile";
</style>
