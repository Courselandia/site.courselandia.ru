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
      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Цена
        </div>
        <transition name="fade">
          <div
            v-if="selectedPrice[0] !== priceMin || selectedPrice[1] !== priceMax"
            class="catalog-filters__reset"
            @click="onClickResetPrice"
            @keyup="onClickResetPrice"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="catalog-filters__selection">
          <RangeSlider
            v-model:value="selectedPrice"
            :min="priceMin"
            :max="priceMax"
            :step="priceStep"
            :label="getLabelPrice"
            money
          />
        </div>
      </div>
      <div class="catalog-filters__block">
        <Item
          label="Рассрочка"
          horizontal
        >
          <Switch
            v-model:value="loan"
            name="loan"
          />
        </Item>
      </div>
      <div class="catalog-filters__block">
        <Item
          label="Только бесплатные"
          horizontal
        >
          <Switch
            v-model:value="free"
            name="free"
          />
        </Item>
      </div>
      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Длительность
        </div>
        <transition name="fade">
          <div
            v-if="selectedDuration[0] !== durationMin || selectedDuration[1] !== durationMax"
            class="catalog-filters__reset"
            @click="onClickResetDuration"
            @keyup="onClickResetDuration"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="catalog-filters__selection">
          <RangeSlider
            v-model:value="selectedDuration"
            :min="durationMin"
            :max="durationMax"
            :step="durationStep"
            :label="getLabelDuration"
            money
          />
        </div>
      </div>
      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Школы
        </div>
        <transition name="fade">
          <div
            v-if="selectedSchoolsValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetSchools"
            @keyup="onClickResetSchools"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="catalog-filters__selection">
          <CatalogFilterSelect
            v-model:value="selectedSchools"
            :items="schools"
          />
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
import Item from '@/components/atoms/form/Item.vue';
import Radio from '@/components/atoms/form/Radio.vue';
import RangeSlider from '@/components/atoms/form/RangeSlider.vue';
import Switch from '@/components/atoms/form/Switch.vue';
import Icon from '@/components/atoms/Icon.vue';
import Tag from '@/components/atoms/Tag.vue';
import Tags from '@/components/molecules/Tags.vue';
import CatalogFilterSelect from '@/interfaces/components/molecules/CatalogFilterSelect';
import IDirection from '@/interfaces/components/molecules/direction';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import TId from '@/types/id';

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
  schools: {
    type: Array as PropType<Array<ISchool>>,
    required: true,
  },
  selectedSchools: {
    type: Object as PropType<Array<ISchool>>,
    required: false,
    default: null,
  },
});

//

const {
  selectedDirection,
  selectedRating,
  selectedSchools,
} = toRefs(props);

const emit = defineEmits({
  'update:selected-direction': (_: IDirection) => true,
  'update:selected-rating': (_: IRating) => true,
  'update:selected-schools': (_: Array<ISchool>) => true,
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

const selectedRatingValue = ref<TId>(selectedRating.value?.value);

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

//

const priceMin = ref(0);
const priceMax = ref(350000);
const priceStep = ref(1000);
const selectedPrice = ref([priceMin.value, priceMax.value]);

const onClickResetPrice = (): void => {
  selectedPrice.value = [priceMin.value, priceMax.value];
};

const getLabelPrice = () => '₽';

//

const loan = ref(false);

//

const free = ref(false);

//

const durationMin = ref(0);
const durationMax = ref(60);
const durationStep = ref(1);
const selectedDuration = ref([durationMin.value, durationMax.value]);

const onClickResetDuration = (): void => {
  selectedDuration.value = [durationMin.value, durationMax.value];
};

const getLabelDuration = (val: number) => {
  if (val === 0) {
    return 'месяцев';
  }

  if (val === 1) {
    return 'месяц';
  }

  if (val >= 2 && val <= 4) {
    return 'месяца';
  }

  return 'месяцев';
};

//

const selectedSchoolsValue = ref(selectedSchools.value);

watch(selectedSchoolsValue, () => {
  emit('update:selected-schools', selectedSchoolsValue.value);
});

watch(selectedSchools, () => {
  selectedSchoolsValue.value = selectedSchools.value;
});

const onClickResetSchools = (): void => {
  selectedSchoolsValue.value = [];
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogFilters.scss";
</style>
