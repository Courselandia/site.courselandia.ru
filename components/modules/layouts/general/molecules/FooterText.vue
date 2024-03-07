<template>
  <div class="footer-text">
    <p>Ищем и сравниваем курсы IT сферы.</p>
    <p>
      Мы — каталог курсов IT сферы.
      Ищите и сравнивайте курсы по различным параметрам:
      цена, продолжительность и другие критерии.
    </p>
    <p>{{ currentYear !== foundYear ? `${foundYear}–${currentYear}` : foundYear }} Courselandia ©</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
const foundYear = 2023;
</script>
