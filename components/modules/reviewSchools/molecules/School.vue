<template>
  <div class="school">
    <div class="school__group">
      <div class="school__td school__td--school">
        <Logo
          v-if="school.image"
          :image="school.image"
          :label="school.label"
          :site="school.site"
        />
        <template
          v-else
        >
          {{ school.label }}
        </template>
      </div>
      <div class="school__td school__td--description">
        <Text
          v-if="school.text"
          :text="school.text"
        />
      </div>
    </div>
    <div class="school__group">
      <div class="school__td school__td--courses">
        <Tags
          v-if="school.amount_courses.all"
          :amount-courses="school.amount_courses"
          :label="school.label"
          :link="school.link"
        />
      </div>
      <div class="school__td school__td--rating">
        <div class="school__info">
          <div class="school__rating">
            <Rating
              :rating="school.rating"
            />
          </div>
          <div class="school__button">
            <Button
              :reviews="school.reviews"
              :link="school.link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import Button from '@/components/modules/reviewSchools/atoms/Button.vue';
import Logo from '@/components/modules/reviewSchools/atoms/Logo.vue';
import Rating from '@/components/modules/reviewSchools/atoms/Rating.vue';
import Text from '@/components/modules/reviewSchools/atoms/Text.vue';
import Tags from '@/components/modules/reviewSchools/molecules/Tags.vue';
import type IListSchoolReview from '@/interfaces/components/modules/reviewSchools/listSchoolReview';

defineProps({
  school: {
    type: Object as PropType<IListSchoolReview>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/reviewSchools/molecules/school";
</style>
