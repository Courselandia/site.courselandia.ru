<template>
  <div
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
        >
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
    <div class="search__results">
      <div class="search__amount">
        Найдено 120 курсов
      </div>
      <div class="search__courses">
        <CourseSearchResult />
        <CourseSearchResult />
        <CourseSearchResult />
        <CourseSearchResult />
        <CourseSearchResult />
        <CourseSearchResult />
      </div>
      <div class="search__action">
        <div class="search__link">
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
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import CourseSearchResult from '@/components/molecules/CourseSearchResult.vue';

const query = ref<string>();
const hover = ref(false);
const focus = ref(false);

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
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/search.scss";
</style>
