<template>
  <div class="header-teacher mb-12">
    <div
      v-if="teacher.text && !teacher.copied"
      class="header-teacher__bck"
    >
      <div class="header-teacher__items content">
        <div class="header-teacher__item header-teacher__item--media">
          <HeaderTeacherPhoto
            :name="teacher.name"
            :path="teacher.image_small_id?.path"
          />
          <HeaderTeacherSocials
            :social-medias="teacher.social_medias"
          />
        </div>
        <div class="header-teacher__item header-teacher__item--bio">
          <div class="header-teacher__header">
            <HeaderTeacherName
              :name="teacher.header || teacher.name"
            />
            <HeaderTeacherRating
              v-if="teacher.rating"
              :rating="teacher.rating"
            />
          </div>
          <HeaderTeacherCity
            v-if="teacher.city"
            :city="teacher.city"
          />
          <HeaderTeacherText
            v-if="teacher.text"
            :text="teacher.text"
          />
          <div
            v-if="teacher.directions.length || teacher.schools.length"
            class="header-teacher__params"
          >
            <HeaderTeacherDirections
              v-if="teacher.directions.length"
              :directions="teacher.directions"
            />
            <HeaderTeacherSchools
              v-if="teacher.schools.length"
              :schools="teacher.schools"
            />
          </div>
        </div>
        <HeaderTeacherExperiences
          v-if="teacher.experiences.length"
          :experiences="teacher.experiences"
        />
      </div>
    </div>
    <div
      v-else
    >
      <div class="content mt-12">
        <HeaderTeacherNameTitle
          :name="teacher.header || teacher.name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import HeaderTeacherCity from '@/components/modules/catalog/atoms/HeaderTeacherCity.vue';
import HeaderTeacherName from '@/components/modules/catalog/atoms/HeaderTeacherName.vue';
import HeaderTeacherNameTitle from '@/components/modules/catalog/atoms/HeaderTeacherNameTitle.vue';
import HeaderTeacherPhoto from '@/components/modules/catalog/atoms/HeaderTeacherPhoto.vue';
import HeaderTeacherRating from '@/components/modules/catalog/atoms/HeaderTeacherRating.vue';
import HeaderTeacherText from '@/components/modules/catalog/atoms/HeaderTeacherText.vue';
import HeaderTeacherDirections from '@/components/modules/catalog/molecules/HeaderTeacherDirections.vue';
import HeaderTeacherExperiences from '@/components/modules/catalog/molecules/HeaderTeacherExperiences.vue';
import HeaderTeacherSchools from '@/components/modules/catalog/molecules/HeaderTeacherSchools.vue';
import HeaderTeacherSocials from '@/components/modules/catalog/molecules/HeaderTeacherSocials.vue';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';

const props = defineProps({
  teacher: {
    type: Object as PropType<ITeacherLink>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/catalog/molecules/headerTeacher";
</style>
