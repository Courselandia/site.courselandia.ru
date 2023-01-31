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
        <transition name="fade">
          <div
            v-if="selectedRatingValue"
            class="catalog-filters__reset"
            @click="onClickResetRating"
            @keyup="onClickResetRating"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
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
            v-model:value="selectedSchoolsValue"
            :items="schools"
            @load-items="onLoadItems('schools')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Категории
        </div>
        <transition name="fade">
          <div
            v-if="selectedCategoriesValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetCategories"
            @keyup="onClickResetCategories"
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
            v-model:value="selectedCategoriesValue"
            :items="categories"
            @load-items="onLoadItems('categories')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Профессии
        </div>
        <transition name="fade">
          <div
            v-if="selectedProfessionsValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetProfessions"
            @keyup="onClickResetProfessions"
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
            v-model:value="selectedProfessionsValue"
            :items="professions"
            @load-items="onLoadItems('professions')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Учителя
        </div>
        <transition name="fade">
          <div
            v-if="selectedTeachersValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetTeachers"
            @keyup="onClickResetTeachers"
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
            v-model:value="selectedTeachersValue"
            :items="teachers"
            @load-items="onLoadItems('teachers')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Навыки
        </div>
        <transition name="fade">
          <div
            v-if="selectedSkillsValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetSkills"
            @keyup="onClickResetSkills"
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
            v-model:value="selectedSkillsValue"
            :items="skills"
            @load-items="onLoadItems('skills')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Инструменты
        </div>
        <transition name="fade">
          <div
            v-if="selectedToolsValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetTools"
            @keyup="onClickResetTools"
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
            v-model:value="selectedToolsValue"
            :items="tools"
            @load-items="onLoadItems('tools')"
          />
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Форма обучения
        </div>

        <transition name="fade">
          <div
            v-if="selectedFormatValue !== null && selectedFormatValue !== undefined"
            class="catalog-filters__reset"
            @click="onClickResetFormat"
            @keyup="onClickResetFormat"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="catalog-filters__selection">
          <Group v-model:value="selectedFormatValue">
            <Radio
              v-for="(format, key) in formats"
              :key="key"
              :value="format.value"
              :label="format.label"
              name="format"
            />
          </Group>
        </div>
      </div>

      <div class="catalog-filters__block">
        <div class="catalog-filters__title">
          Уровни курса
        </div>

        <transition name="fade">
          <div
            v-if="selectedLevelsValue?.length"
            class="catalog-filters__reset"
            @click="onClickResetLevels"
            @keyup="onClickResetLevels"
          >
            <Icon
              name="close"
              color="white"
              :size="[15, 15]"
            />
          </div>
        </transition>
        <div class="catalog-filters__selection">
          <Group v-model:value="selectedLevelsValue">
            <Checkbox
              v-for="(level, key) in levels"
              :key="key"
              :value="level.value"
              :label="level.label"
              name="level"
            />
          </Group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash';
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
import CatalogFilterSelect from '@/components/molecules/CatalogFilterSelect.vue';
import Tags from '@/components/molecules/Tags.vue';
import ICategory from '@/interfaces/components/molecules/category';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import ILevel from '@/interfaces/components/molecules/level';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
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
  categories: {
    type: Array as PropType<Array<ICategory>>,
    required: true,
  },
  selectedCategories: {
    type: Object as PropType<Array<ICategory>>,
    required: false,
    default: null,
  },
  professions: {
    type: Array as PropType<Array<IProfession>>,
    required: true,
  },
  selectedProfessions: {
    type: Object as PropType<Array<IProfession>>,
    required: false,
    default: null,
  },
  teachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: true,
  },
  selectedTeachers: {
    type: Object as PropType<Array<ITeacher>>,
    required: false,
    default: null,
  },
  skills: {
    type: Array as PropType<Array<ISkill>>,
    required: true,
  },
  selectedSkills: {
    type: Object as PropType<Array<ISkill>>,
    required: false,
    default: null,
  },
  tools: {
    type: Array as PropType<Array<ITool>>,
    required: true,
  },
  selectedTools: {
    type: Object as PropType<Array<ITool>>,
    required: false,
    default: null,
  },
  formats: {
    type: Array as PropType<Array<IFormat>>,
    required: true,
  },
  selectedFormat: {
    type: Object as PropType<IFormat>,
    required: false,
    default: null,
  },
  levels: {
    type: Array as PropType<Array<ILevel>>,
    required: true,
  },
  selectedLevels: {
    type: Object as PropType<Array<ILevel>>,
    required: false,
    default: null,
  },
});

//

const {
  selectedDirection,
  selectedRating,
  selectedSchools,
  selectedCategories,
  selectedProfessions,
  selectedTeachers,
  selectedSkills,
  selectedTools,
  selectedFormat,
  selectedLevels,
} = toRefs(props);

const emit = defineEmits({
  'load-items': (_: string) => true,
  'update:selected-direction': (_: IDirection) => true,
  'update:selected-rating': (_: IRating) => true,
  'update:selected-schools': (_: Array<ISchool>) => true,
  'update:selected-categories': (_: Array<ICategory>) => true,
  'update:selected-professions': (_: Array<IProfession>) => true,
  'update:selected-teachers': (_: Array<ITeacher>) => true,
  'update:selected-skills': (_: Array<ISkill>) => true,
  'update:selected-tools': (_: Array<ITool>) => true,
  'update:selected-format': (_: IFormat) => true,
  'update:selected-levels': (_: ILevel) => true,
});

//

const onLoadItems = (name: string): void => {
  emit('load-items', name);
};

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

const selectedRatingValue = ref<TId | null>(selectedRating.value?.value);

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

const onClickResetRating = (): void => {
  selectedRatingValue.value = null;
};

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

//

const selectedCategoriesValue = ref(selectedCategories.value);

watch(selectedCategoriesValue, () => {
  emit('update:selected-categories', selectedCategoriesValue.value);
});

watch(selectedCategories, () => {
  selectedCategoriesValue.value = selectedCategories.value;
});

const onClickResetCategories = (): void => {
  selectedCategoriesValue.value = [];
};

//

const selectedProfessionsValue = ref(selectedProfessions.value);

watch(selectedProfessionsValue, () => {
  emit('update:selected-professions', selectedProfessionsValue.value);
});

watch(selectedProfessions, () => {
  selectedProfessionsValue.value = selectedProfessions.value;
});

const onClickResetProfessions = (): void => {
  selectedProfessionsValue.value = [];
};

//

const selectedTeachersValue = ref(selectedTeachers.value);

watch(selectedTeachersValue, () => {
  emit('update:selected-teachers', selectedTeachersValue.value);
});

watch(selectedTeachers, () => {
  selectedTeachersValue.value = selectedTeachers.value;
});

const onClickResetTeachers = (): void => {
  selectedTeachersValue.value = [];
};

//

const selectedSkillsValue = ref(selectedSkills.value);

watch(selectedSkillsValue, () => {
  emit('update:selected-skills', selectedSkillsValue.value);
});

watch(selectedSkills, () => {
  selectedSkillsValue.value = selectedSkills.value;
});

const onClickResetSkills = (): void => {
  selectedSkillsValue.value = [];
};

//

const selectedToolsValue = ref(selectedTools.value);

watch(selectedToolsValue, () => {
  emit('update:selected-tools', selectedToolsValue.value);
});

watch(selectedTools, () => {
  selectedToolsValue.value = selectedTools.value;
});

const onClickResetTools = (): void => {
  selectedToolsValue.value = [];
};

//

const selectedFormatValue = ref<boolean | null>(selectedFormat.value?.value);

watch(selectedFormatValue, () => {
  console.log('HERE!');
  const selectedFormatValueFound = props.formats.find(
    (itm) => itm.value === selectedFormatValue.value,
  );

  if (selectedFormatValueFound) {
    emit('update:selected-format', selectedFormatValueFound);
  }
});

watch(selectedFormat, () => {
  selectedFormatValue.value = selectedFormat.value.value;
});

const onClickResetFormat = (): void => {
  selectedFormatValue.value = null;
};

//

const selectedLevelsValue = ref<Array<ILevel> | null>(
  selectedLevels.value?.map((itm) => itm.value),
);

watch(selectedLevelsValue, () => {
  const selectedLevelsValueFound = props.levels.filter(
    (itm) => selectedLevelsValue.value?.indexOf(itm.value) !== -1,
  );

  if (selectedLevelsValueFound) {
    emit('update:selected-levels', selectedLevelsValueFound);
  }
}, {
  deep: true,
});

watch(selectedLevels, () => {
  const newValue = selectedLevels.value?.map((itm) => itm.value);

  if (!isEqual(selectedLevelsValue.value, newValue)) {
    selectedLevelsValue.value = newValue;
  }
});

const onClickResetLevels = (): void => {
  selectedLevelsValue.value = [];
};
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/catalogFilters.scss";
</style>
