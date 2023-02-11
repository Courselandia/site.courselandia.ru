<template>
  <div class="course-view-teachers">
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
    <div class="course-view-teachers__item">
      <div class="course-view-teachers__picture">
        <Animal />
      </div>
      <div class="course-view-teachers__info">
        <div class="course-view-teachers__name">
          Ольга Реутова
        </div>
        <div class="course-view-teachers__position">
          Эксперт
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Animal from '@/components/atoms/Animal.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/courseViewTeachers.scss";
</style>
