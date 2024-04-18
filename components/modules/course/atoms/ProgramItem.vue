<template>
  <div class="program-item">
    <div class="program-item__name">
      {{ item.name }}
    </div>
    <transition name="fade">
      <div
        v-if="(item.text || item.children?.length) && action"
        class="program-item__text lists"
      >
        <div
          v-html="item.text"
        />
        <div
          v-if="item.children?.length"
          class="program-item__children"
        >
          <ProgramItem
            v-for="(itemInside, key) in item.children"
            :key="key"
            :item="itemInside"
          />
        </div>
      </div>
    </transition>
    <div
      v-if="(item.text || item.children?.length)"
      class="program-item__action"
      @click="onClick"
      @keyup="onClick"
    >
      <Icon
        :name="action ? 'minus-circle' : 'plus-circle'"
        color="blue2"
        :size="[32, 32]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  ref,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import type IProgram from '@/interfaces/components/modules/course/program';

defineProps({
  item: {
    type: Object as PropType<IProgram>,
    required: true,
  },
});

const action = ref(false);

const onClick = (): void => {
  action.value = !action.value;
};
</script>

<script lang="ts">
export default {
  name: 'ProgramItem',
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/modules/course/atoms/programItem";
</style>
