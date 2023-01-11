<template>
  <div
    class="menu-top"
  >
    <div class="menu-top__item">
      <div
        :class="`menu-top__link ${menuValue === 'courses' ? 'link--active' : ''}`"
        @click="onClick('courses')"
        @keydown="onClick('courses')"
      >
        Курсы
      </div>
    </div>
    <div class="menu-top__item">
      <nuxt-link
        to="/schools"
        class="menu-top__link"
      >
        Школы
      </nuxt-link>
    </div>
    <div class="menu-top__item">
      <nuxt-link
        to="/reviews"
        class="menu-top__link"
      >
        Отзывы о школах
      </nuxt-link>
    </div>
    <div class="menu-top__item">
      <nuxt-link
        to="/reviews"
        class="menu-top__link"
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

const onClick = (name: string): void => {
  menuValue.value = menuValue.value !== name ? name : null;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/menuTop.scss";
</style>
