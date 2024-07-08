<template>
  <div
    v-if="collections?.length"
    class="collection-list"
  >
    <div
      ref="contentRef"
      class="collection-list__content"
    >
      <Loader
        :active="loading"
        color="white-transparency"
      >
        <Collection
          v-for="(collection, key) in collections"
          :key="key"
          :collection="collection"
        />
      </Loader>
    </div>
    <div class="collection-list__pagination">
      <Pagination
        :total="total"
        :size="limit"
        :page="pageValue"
        :link="getLinkPagination"
        @click="onClickPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  type PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadCollections } from '@/api/collection';
import Loader from '@/components/atoms/Loader.vue';
import Pagination from '@/components/atoms/Pagination.vue';
import Collection from '@/components/modules/collections/molecules/Collection.vue';
import EDirection from '@/enums/direction';
import type { IResponseItems } from '@/interfaces/response';
import type ICollection from '@/interfaces/stores/collection/collection';

const props = defineProps({
  direction: {
    type: [String, Number] as PropType<EDirection>,
    required: false,
    default: null,
  },
  page: {
    type: Number,
    required: false,
    default: 1,
  },
});

const emit = defineEmits({
  'update:page': (_: number) => true,
});

const route = useRoute();
const limit = 30;
const total = ref<number>();
const collections = ref<Array<ICollection>>();
const loading = ref(false);
const getLinkPagination = (pg: number): string => `/collections?page=${pg}`;
const contentRef = ref<HTMLElement | null>(null);

const {
  page,
  direction,
} = toRefs(props);

const pageValue = ref<number>(page.value);

watch(pageValue, () => {
  emit('update:page', pageValue.value);
});

watch(page, () => {
  pageValue.value = page.value;
});

const loadCollections = async (
  fetch: boolean,
  offset: number,
  limitParam: number,
  direct: EDirection | null = null,
): Promise<IResponseItems<ICollection> | null> => {
  try {
    return await apiReadCollections(
      fetch,
      offset,
      limitParam,
      direct,
    );
  } catch (error: any) {
    console.error(error.message);
  }

  return null;
};

const reloadCollections = async (): Promise<void> => {
  loading.value = true;

  const res = await loadCollections(false, (pageValue.value - 1) * limit, limit, direction.value);

  if (res?.data && collections.value) {
    collections.value = res.data;
    total.value = res?.total;
  }

  loading.value = false;
};

const response = await loadCollections(
  !Object.keys(route.query).length,
  (pageValue.value - 1) * limit,
  limit,
  direction.value,
);

collections.value = response?.data;
total.value = response?.total;

const onLoadDirection = async (): Promise<void> => {
  pageValue.value = 1;

  await reloadCollections();
};

const onClickPage = async (toPage: number): Promise<void> => {
  pageValue.value = toPage;

  if (contentRef.value) {
    const y = contentRef.value.getBoundingClientRect().top + window.scrollY - 300;

    window.scroll({
      top: y,
      behavior: 'smooth',
    });
  }

  await reloadCollections();
};

watch(direction, async () => {
  await onLoadDirection();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collections/molecules/collectionList";
</style>
