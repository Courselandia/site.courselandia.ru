<template>
  <div
    v-if="publications?.length"
    class="list"
  >
    <ScrollLoader
      :stop="stopScrollLoader"
      :distance="400"
      @load="onLoadScrolling"
    >
      <Loader
        :active="loading"
        color="white-transparency"
      >
        <Publication
          v-for="(publication, key) in publications"
          :key="key"
          :publication="publication"
        />
      </Loader>
    </ScrollLoader>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadPublications } from '@/api/publication';
import Loader from '@/components/atoms/Loader.vue';
import ScrollLoader from '@/components/atoms/ScrollLoader.vue';
import Publication from '@/components/modules/publications/molecules/Publication.vue';
import type IList from '@/interfaces/stores/publication/list';
import type IPublication from '@/interfaces/stores/publication/publication';

const route = useRoute();
const limit = 20;
const page = ref(1);
const total = ref<number>();
const publications = ref<Array<IPublication>>();
const stopScrollLoader = ref(false);
const loading = ref(false);

if (route.query.page && Number(route.query.page)) {
  page.value = Number(route.query.page);
}

const loadPublications = async (
  fetch: boolean,
  offset: number,
  limitParam: number,
): Promise<IList | null> => {
  try {
    return await apiReadPublications(
      fetch,
      offset,
      limitParam,
    );
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const list = await loadPublications(
  !Object.keys(route.query).length,
  0,
  page.value * limit,
);
publications.value = list?.publications;
total.value = list?.total;

const setUrlQuery = (): void => {
  const queries: Array<string> = [];

  if (page.value && page.value !== 1) {
    // queries.push(`page=${page.value}`);
  }

  const query = queries.join('&');
  let url = '/blog';

  if (query) {
    url = `${url}?${query}`;
  }

  const newState = {
    current: url,
  };

  window.history.pushState(
    newState,
    '',
    url,
  );
};

watch(page, () => {
  setUrlQuery();
});

const onLoadScrolling = async (): Promise<void> => {
  page.value++;

  const listAdditional = await loadPublications(false, (page.value - 1) * limit, limit);

  if (listAdditional && publications.value) {
    publications.value = publications.value.concat(listAdditional.publications);
  }

  if ((page.value * limit) >= (total.value || 0)) {
    stopScrollLoader.value = true;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/molecules/list";
</style>
