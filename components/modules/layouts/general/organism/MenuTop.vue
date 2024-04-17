<template>
  <div
    class="menu-top"
  >
    <div class="menu-top__item">
      <div
        :class="`menu-top__link ${hover === 'courses' ? 'menu-top__link--hover' : ''} ${(menuValue === 'courses' || active === 'courses') ? 'link--active' : ''}`"
        @click="onClick('courses')"
        @keydown="onClick('courses')"
        @mouseenter="onMouseEnter('courses')"
        @focusin="onMouseEnter('courses')"
        @mouseleave="onMouseLeave()"
        @focusout="onMouseLeave()"
      >
        <div>
          Курсы
        </div>
        <Icon
          :name="menuValue === 'courses' ? 'arrow-up' : 'arrow-down'"
          :color="(hover === 'courses' || menuValue === 'courses' || active === 'courses') ? 'white' : 'black'"
          :size="[8, 8]"
        />
      </div>
    </div>
    <div class="menu-top__item">
      <div
        :class="`menu-top__link ${hover === 'schools' ? 'menu-top__link--hover' : ''} ${(menuValue === 'schools' || active === 'schools') ? 'link--active' : ''}`"
        @click="onClick('schools')"
        @keydown="onClick('schools')"
        @mouseenter="onMouseEnter('schools')"
        @focusin="onMouseEnter('schools')"
        @mouseleave="onMouseLeave()"
        @focusout="onMouseLeave()"
      >
        <div>
          Школы
        </div>
        <Icon
          :name="menuValue === 'schools' ? 'arrow-up' : 'arrow-down'"
          :color="(hover === 'schools' || menuValue === 'schools' || active === 'schools') ? 'white' : 'black'"
          :size="[8, 8]"
        />
      </div>
    </div>
    <div class="menu-top__item">
      <div
        :class="`menu-top__link ${hover === 'reviews' ? 'menu-top__link--hover' : ''} ${(menuValue === 'reviews' || active === 'reviews') ? 'link--active' : ''}`"
        @click="onClick('reviews')"
        @keydown="onClick('reviews')"
        @mouseenter="onMouseEnter('reviews')"
        @focusin="onMouseEnter('reviews')"
        @mouseleave="onMouseLeave()"
        @focusout="onMouseLeave()"
      >
        <div>
          Отзывы
        </div>
        <Icon
          :name="menuValue === 'reviews' ? 'arrow-up' : 'arrow-down'"
          :color="(hover === 'reviews' || menuValue === 'reviews' || active === 'reviews') ? 'white' : 'black'"
          :size="[8, 8]"
        />
      </div>
    </div>
    <div class="menu-top__item" style="display: none">
      <nuxt-link
        to="/collections"
        :class="`menu-top__link ${hover === 'collections' ? 'menu-top__link--hover' : ''} ${(menuValue === 'collections' || active === 'collections') ? 'link--active' : ''}`"
        @mouseenter="onMouseEnter('collections')"
        @focusin="onMouseEnter('collections')"
        @mouseleave="onMouseLeave()"
        @focusout="onMouseLeave()"
      >
        Подборки
      </nuxt-link>
    </div>
    <div class="menu-top__item">
      <nuxt-link
        to="/blog"
        :class="`menu-top__link ${hover === 'blog' ? 'menu-top__link--hover' : ''} ${(menuValue === 'blog' || active === 'blog') ? 'link--active' : ''}`"
        @mouseenter="onMouseEnter('blog')"
        @focusin="onMouseEnter('blog')"
        @mouseleave="onMouseLeave()"
        @focusout="onMouseLeave()"
      >
        Блог
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';

const props = defineProps({
  menu: {
    type: String,
    required: false,
    default: null,
  },
  active: {
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

const hover = ref();

const onClick = (name: string): void => {
  menuValue.value = menuValue.value !== name ? name : null;
};

const onMouseEnter = (name: string): void => {
  hover.value = name;
};

const onMouseLeave = (): void => {
  hover.value = null;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/menuTop";
</style>
