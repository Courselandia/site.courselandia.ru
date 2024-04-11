<template>
  <div
    v-if="itemLinkCollection"
    class="collection content mt-12 mb-24 mb-12-sm"
  >
    <div class="collection__side collection__side--title">
      <Back />
      <Header
        :header="itemLinkCollection.name"
      />
    </div>
    <div class="collection__side collection__side--left">
      <Description
        v-if="itemLinkCollection.text"
        :text="itemLinkCollection.text"
      />
      <Courses
        v-if="courses?.length"
        :courses="courses"
        :type="ECourseType.BOX"
      />
      <Additional
        v-if="itemLinkCollection.additional"
        :text="itemLinkCollection.additional"
      />
    </div>
    <div class="collection__side collection__side--right">
      <CollectionImage
        :path-box="itemLinkCollection.image_small_id?.path"
        :path-horizontal="itemLinkCollection.image_middle_id?.path"
        :name="collection.name"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Courses from '@/components/modules/catalog/molecules/Courses.vue';
import Additional from '@/components/modules/collection/atoms/Additional.vue';
import Back from '@/components/modules/collection/atoms/Back.vue';
import CollectionImage from '@/components/modules/collection/atoms/CollectionImage.vue';
import Description from '@/components/modules/collection/atoms/Description.vue';
import Header from '@/components/modules/collection/atoms/Header.vue';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ECourseType from '@/enums/components/modules/catalog/courseType';
import type ICourse from '@/interfaces/components/modules/course';
import collection from '@/stores/collection';

const { itemLinkCollection } = storeToRefs(collection());
const config = useRuntimeConfig();
const title = itemLinkCollection.value?.metatag?.title;
const description = itemLinkCollection.value?.metatag?.description;
const image = itemLinkCollection.value?.image_big_id?.path;
const width = itemLinkCollection.value?.image_big_id?.width;
const height = itemLinkCollection.value?.image_big_id?.height;
const courses = ref<ICourse[]>(
  coursesStoreToCoursesComponent(itemLinkCollection.value?.courses || []),
);

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image || `${config.public.apiUrl}/storage/uploaded/images/prev.png`,
    },
    {
      property: 'og:image:width',
      content: width || '1200',
    },
    {
      property: 'og:image:height',
      content: height || '630',
    },
  ],
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collection/organism/collection";
</style>
