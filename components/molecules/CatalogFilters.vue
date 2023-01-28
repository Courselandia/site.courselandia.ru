<template>
  <div class="catalog-filters">
    <div class="catalog-filters__directions">
      <Tags>
        <Tag
          v-for="(direction, key) in directions"
          :key="key"
          :border="selectedDirectionValue?.id === direction.id ? 'blue2' : 'grey2'"
          border-hover="blue2"
          bck="white"
          color="black"
          @click="onClickDirection(direction)"
          @keyup="onClickDirection(direction)"
        >
          {{ direction.name }}
        </Tag>
      </Tags>
    </div>
    <div class="catalog-filters__panel">
      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Рейтинг
        </div>
        <div class="catalog-filters__selection">
          <Group v-model:value="selectedRatingValue">
            <Radio
              v-for="(rating, key) in ratings"
              :key="key"
              :value="rating.value"
              :label="rating.label"
              name="rating"
            />
          </Group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';

import Checkbox from '@/components/atoms/form/Checkbox.vue';
import Group from '@/components/atoms/form/Group.vue';
import Radio from '@/components/atoms/form/Radio.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import IDirection from '@/interfaces/components/molecules/direction';
import IRating from '@/interfaces/components/molecules/rating';

const props = defineProps({
  directions: {
    type: Array as PropType<Array<IDirection>>,
    required: true,
  },
  selectedDirection: {
    type: Object as PropType<IDirection>,
    required: false,
    default: null,
  },
  ratings: {
    type: Array as PropType<Array<IRating>>,
    required: true,
  },
  selectedRating: {
    type: Object as PropType<IRating>,
    required: false,
    default: null,
  },
});

//

const {
  selectedDirection,
  selectedRating,
} = toRefs(props);

const emit = defineEmits({
  'update:selected-direction': (_: IDirection) => true,
  'update:selected-rating': (_: IRating) => true,
});

//

const selectedDirectionValue = ref(selectedDirection.value);

watch(selectedDirectionValue, () => {
  emit('update:selected-direction', selectedDirectionValue.value);
});

watch(selectedDirection, () => {
  selectedDirectionValue.value = selectedDirection.value;
});

const onClickDirection = (value: IDirection): void => {
  selectedDirectionValue.value = value;
};

//

const selectedRatingValue = ref<string | number>(selectedRating.value?.value);

watch(selectedRatingValue, () => {
  const selectedRatingValueFound = props.ratings.find(
    (itm) => itm.value === selectedRatingValue.value,
  );

  if (selectedRatingValueFound) {
    emit('update:selected-rating', selectedRatingValueFound);
  }
});

watch(selectedRating, () => {
  selectedRatingValue.value = selectedRating.value.value;
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogFilters.scss";
</style>
