<template>
  <div class="course-view-info">
    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Формат обучения
      </div>
      <div class="course-view-info__value">
        Онлайн
      </div>
    </div>

    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Длительность
      </div>
      <div class="course-view-info__value">
        2 месяца
      </div>
    </div>

    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Инструменты
      </div>
      <div class="course-view-info__value">
        Figma, Adobe After Effect
      </div>
    </div>

    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Уровень
      </div>
      <div class="course-view-info__value">
        Продвинутый
      </div>
    </div>

    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Навыки
      </div>
      <div class="course-view-info__value">
        Работа в Houdini, создание анимации разрушения и взрывов,
        риггинг модели, экспорт симуляций в игровой движок.
      </div>
    </div>

    <div class="course-view-info__block">
      <div class="course-view-info__title">
        Авторы
      </div>
      <div class="course-view-info__value">
        <nuxt-link to="/teachers/1" class="link">
          Наталья Бондаренко
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Антон Антонюк
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Анна Арчен
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Татьяна Пикушина
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Дмитрий Смирнов
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Никита Беллер
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Наталья Бондаренко
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Антон Антонюк
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Анна Арчен
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Татьяна Пикушина
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Дмитрий Смирнов
        </nuxt-link>,
        <nuxt-link to="/teachers/1" class="link">
          Никита Беллер
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewInfo.scss";
</style>
