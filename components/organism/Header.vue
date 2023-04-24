<template>
  <div class="content">
    <header class="header">
      <div class="header__logo">
        <Logo />
      </div>
      <div class="header__menu">
        <MenuTop
          v-model:menu="menuValue"
          :active="active"
        />
      </div>
      <div class="header__search">
        <Search />
      </div>
      <div class="header__loop">
        <SearchMobile />
      </div>
      <div class="header__favorite">
        <Favorite />
      </div>
      <div class="header__burger">
        <SlideMenu
          v-model:show="show"
        >
          <MenuTopMobile v-model:show="show" />
        </SlideMenu>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  watch,
} from 'vue';

import Logo from '@/components/atoms/Logo.vue';
import SlideMenu from '@/components/molecules/SlideMenu.vue';
import Favorite from '@/components/organism/Favorite.vue';
import MenuTop from '@/components/organism/MenuTop.vue';
import MenuTopMobile from '@/components/organism/MenuTopMobile.vue';
import Search from '@/components/organism/Search.vue';
import SearchMobile from '@/components/organism/SearchMobile.vue';

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
  'update:menu': (_: string | undefined) => true,
});

const menuValue = ref<string | undefined>(menu.value);

watch(menuValue, () => {
  emit('update:menu', menuValue.value);
});

watch(menu, () => {
  menuValue.value = menu.value;
});

const show = ref(false);

const onClick = (): void => {
  show.value = false;
};
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/header.scss";
</style>
