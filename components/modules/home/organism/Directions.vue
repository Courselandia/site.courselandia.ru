<template>
  <div>
    <h2 class="title title--big title--center-mobil">
      Популярные направления
    </h2>
    <Directions
      v-if="listDirections"
      class="mb-40 mb-12-sm"
    >
      <template
        v-for="(item, key) in listDirections"
        :key="key"
      >
        <Direction
          :image="item.image?.default"
          :amount="item.amount"
          :label="item.label"
          :link="item.path"
        />
      </template>
    </Directions>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import Direction from '@/components/modules/home/atoms/Direction.vue';
import Directions from '@/components/modules/home/molecules/Directions.vue';
import directionsToMenu from '@/converts/directionsToMenu';
import type IMenu from '@/interfaces/menu';
import direction from '@/stores/direction';

const { directions } = storeToRefs(direction());
const listDirections = ref<IMenu[]>();

try {
  listDirections.value = await directionsToMenu(directions.value);
} catch (error: any) {
  console.error(error.message);
}
</script>
