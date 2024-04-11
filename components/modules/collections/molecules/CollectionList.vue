<template>
  <div
    v-if="collections?.length"
    class="collection-list"
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
        <Collection
          v-for="(collection, key) in collections"
          :key="key"
          :collection="collection"
        />
      </Loader>
    </ScrollLoader>
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
import ScrollLoader from '@/components/atoms/ScrollLoader.vue';
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
const stopScrollLoader = ref(false);
const loading = ref(false);

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

const response = await loadCollections(
  !Object.keys(route.query).length,
  0,
  pageValue.value * limit,
  direction.value,
);

collections.value = response?.data;
total.value = response?.total;
stopScrollLoader.value = (pageValue.value * limit) >= (total.value || 0);

const onLoadScrolling = async (): Promise<void> => {
  pageValue.value++;

  const res = await loadCollections(false, (pageValue.value - 1) * limit, limit, direction.value);

  if (res?.data && collections.value) {
    collections.value = collections.value.concat(res.data);
  }

  if ((pageValue.value * limit) >= (total.value || 0)) {
    stopScrollLoader.value = true;
  }
};

const onLoadDirection = async (): Promise<void> => {
  stopScrollLoader.value = true;
  pageValue.value = 1;
  const res = await loadCollections(false, (pageValue.value - 1) * limit, limit, direction.value);

  if (res?.data && collections.value) {
    collections.value = res.data;
    total.value = res?.total;
  }

  stopScrollLoader.value = (pageValue.value * limit) >= (total.value || 0);
};

watch(direction, async () => {
  await onLoadDirection();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/collections/molecules/collectionList";
</style>
