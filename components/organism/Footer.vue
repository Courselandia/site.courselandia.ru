<template>
  <footer class="footer">
    <div class="content">
      <div class="footer__sides">
        <div class="footer__side footer__side--left">
          <div class="footer__logo">
            <Logo light />
          </div>
          <div class="footer__info">
            <p>Сравниваем онлайн-курсы по digital и IT.</p>
            <p>Мы — каталог-отзовик курсов. Выбирайте курсы по отзывам, цене, продолжительности и другим критериям!</p>
            <p>2023 Courcesalndia ©</p>
          </div>
        </div>
        <div class="footer__side footer__side--right">

        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import Logo from '@/components/atoms/Logo.vue';
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/footer.scss";
</style>
