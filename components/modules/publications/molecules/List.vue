<template>
  <div
    v-if="publications?.length"
    class="list"
  >
    <div
      ref="contentRef"
      class="list__content"
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
    </div>
    <div class="list__pagination">
      <Pagination
        :total="total"
        :size="limit"
        :page="page"
        :link="getLinkPagination"
        @click="onClickPage"
      />
    </div>
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
import Pagination from '@/components/atoms/Pagination.vue';
import Publication from '@/components/modules/publications/molecules/Publication.vue';
import type IList from '@/interfaces/stores/publication/list';
import type IPublication from '@/interfaces/stores/publication/publication';

const route = useRoute();
const limit = 20;
const page = ref(1);
const total = ref<number>();
const publications = ref<Array<IPublication>>();
const loading = ref(false);
const getLinkPagination = (pg: number): string => `/blog?page=${pg}`;
const contentRef = ref<HTMLElement | null>(null);

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

const reloadPublications = async (): Promise<void> => {
  const list = await loadPublications(
    !Object.keys(route.query).length,
    (page.value - 1) * limit,
    limit,
  );
  publications.value = list?.publications;
  total.value = list?.total;
};

const list = await loadPublications(
  !Object.keys(route.query).length,
  (page.value - 1) * limit,
  limit,
);
publications.value = list?.publications;
total.value = list?.total;

const setUrlQuery = (): void => {
  const queries: Array<string> = [];

  if (page.value && page.value !== 1) {
    queries.push(`page=${page.value}`);
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

const onClickPage = async (toPage: number): Promise<void> => {
  page.value = toPage;

  if (contentRef.value) {
    const y = contentRef.value.getBoundingClientRect().top + window.scrollY - 200;

    window.scroll({
      top: y,
      behavior: 'smooth',
    });
  }

  await reloadPublications();
};

watch(page, () => {
  setUrlQuery();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/publications/molecules/list";
</style>
