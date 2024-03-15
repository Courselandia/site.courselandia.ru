<template>
  <div class="content">
    <header class="header">
      <div class="header__logo">
        <Logo
          @click="onClickLogo"
        />
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
        <Favorite
          @click="onClickFavorite"
        />
      </div>
      <div class="header__burger">
        <SlideMenu
          v-model:show="show"
        >
          <!--noindex-->
          <ClientOnly>
            <MenuTopMobile
              v-model:show="show"
            />
          </ClientOnly>
          <!--/noindex-->
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

import Logo from '@/components/modules/layouts/general/atoms/Logo.vue';
import SlideMenu from '@/components/modules/layouts/general/molecules/SlideMenu.vue';
import Favorite from '@/components/modules/layouts/general/organism/Favorite.vue';
import MenuTop from '@/components/modules/layouts/general/organism/MenuTop.vue';
import MenuTopMobile from '@/components/modules/layouts/general/organism/MenuTopMobile.vue';
import Search from '@/components/modules/layouts/general/organism/Search.vue';
import SearchMobile from '@/components/modules/layouts/general/organism/SearchMobile.vue';

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

const onClickLogo = (): void => {
  show.value = false;
};

const onClickFavorite = (): void => {
  show.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/header";
</style>
