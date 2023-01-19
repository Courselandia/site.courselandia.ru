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
              v-model="query"
              type="text"
              name="query"
              class="search-mobile__element"
              placeholder="Чему вы хотите научиться?"
              autocomplete="off"
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
          <div class="search-mobile__amount">
            Найдено 120 курсов
          </div>
          <div class="search-mobile__courses">
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
            <CourseSearchResult />
          </div>
          <div class="search-mobile__action">
            <div class="search-mobile__link">
              <div>
                Смотреть все
              </div>
              <Icon
                name="link-to"
                color="blue2"
                :size="[9, 9]"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  onDeactivated,
  ref,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import Loader from '@/components/atoms/Loader.vue';
import CourseSearchResult from '@/components/molecules/CourseSearchResult.vue';

const active = ref(false);
const query = ref<string>();
const loading = ref(true);

watch(active, () => {
  if (active.value) {
    document.body.classList.add('scroll--no-scroll');
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

onDeactivated(() => {
  document.body.classList.remove('scroll--no-scroll');
});
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/searchMobile.scss";
</style>
