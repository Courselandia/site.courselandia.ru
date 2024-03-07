<template>
  <div class="footer">
    <footer class="content">
      <div class="footer__sides">
        <div class="footer__side footer__side--left">
          <div class="footer__logo">
            <Logo light />
          </div>
          <div class="footer__info">
            <FooterText />
          </div>
        </div>
        <div class="footer__side footer__side--right">
          <FooterMenu />
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/components/modules/layouts/general/atoms/Logo.vue';
import FooterText from '@/components/modules/layouts/general/molecules/FooterText.vue';
import FooterMenu from '@/components/modules/layouts/general/organism/FooterMenu.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/layouts/general/organism/footer";
</style>
