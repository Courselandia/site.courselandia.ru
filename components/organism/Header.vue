<template>
  <div class="content">
    <header class="header">
      <div class="header__logo">
        <Logo />
      </div>
      <div class="header__menu">
        <MenuTop />
      </div>
      <div class="header__search">

      </div>
      <div class="header__favorite">
        <Favorite />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/components/atoms/Logo.vue';
import Favorite from '@/components/organism/Favorite.vue';
import MenuTop from '@/components/organism/MenuTop.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/header.scss";
</style>
