<template>
  <div class="content">
    <header class="header">
      <div class="header__logo">
        <Logo />
      </div>
      <div class="header__menu">
        <MenuTop v-model:menu="menuValue" />
      </div>
      <div class="header__search">
        <Search />
      </div>
      <div class="header__favorite">
        <Favorite />
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
import Favorite from '@/components/organism/Favorite.vue';
import MenuTop from '@/components/organism/MenuTop.vue';
import Search from '@/components/organism/Search.vue';

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
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/header.scss";
</style>
