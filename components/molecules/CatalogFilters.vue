<template>
  <div
    :class="`catalog-filters ${nameClass}`"
  >
    <transition-group name="fade">
      <div
        v-if="directions?.length && !mobile"
        key="directions"
        class="catalog-filters__directions"
      >
        <Tags>
          <Tag
            v-for="(direction, key) in directions"
            :key="key"
            :border="selectedDirectionValue?.id === direction.id ? 'blue2' : 'grey2'"
            border-hover="blue2"
            :bck="selectedDirectionValue?.id === direction.id ? 'blue2' : 'white'"
            bck-hover="blue2"
            :color="selectedDirectionValue?.id === direction.id ? 'white' : 'black'"
            color-hover="white"
            cursor
            @click="onClickDirection(direction)"
            @keyup="onClickDirection(direction)"
          >
            {{ direction.name }}
          </Tag>
        </Tags>
      </div>
    </transition-group>
    <div
      v-if="mobile"
      id="catalog-filters-mobile-tags"
      class="catalog-filters__tags"
    />
    <div class="catalog-filters__panel">
      <transition-group name="fade">
        <div
          v-if="directions?.length"
          :key="directions"
          class="catalog-filters__block catalog-filters__block--directions"
        >
          <Tags>
            <Tag
              v-for="(direction, key) in directions"
              :key="key"
              :border="selectedDirectionValue?.id === direction.id ? 'blue2' : 'grey2'"
              border-hover="blue2"
              bck="white"
              color="black"
              cursor
              @click="onClickDirection(direction)"
              @keyup="onClickDirection(direction)"
            >
              {{ direction.name }}
            </Tag>
          </Tags>
        </div>

        <div
          v-if="ratings.length"
          key="ratings"
          class="catalog-filters__block"
        >
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

        <div
          v-if="priceMax && priceMin !== priceMax"
          key="price"
          class="catalog-filters__block"
        >
          <div class="catalog-filters__title">
            Цена
          </div>
          <transition name="fade">
            <div
              v-if="selectedPricesValue[0] !== priceMin || selectedPricesValue[1] !== priceMax"
              class="catalog-filters__reset"
              @click="onClickResetPrices"
              @keyup="onClickResetPrices"
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
              v-model:value="selectedPricesValue"
              :min="priceMin"
              :max="priceMax"
              :step="priceStep"
              :label="getLabelPrice"
              money
              @change="onChangePrices"
            />
          </div>
        </div>

        <div
          v-if="availableCredit"
          key="credit"
          class="catalog-filters__block"
        >
          <Item
            label="Рассрочка"
            horizontal
          >
            <Switch
              v-model:value="selectedCreditValue"
              name="credit"
            />
          </Item>
        </div>

        <div
          v-if="availableFree"
          key="free"
          class="catalog-filters__block"
        >
          <Item
            label="Только бесплатные"
            horizontal
          >
            <Switch
              v-model:value="selectedFreeValue"
              name="free"
            />
          </Item>
        </div>

        <div
          v-if="durationMax && durationMax !== durationMin"
          key="duration"
          class="catalog-filters__block"
        >
          <div class="catalog-filters__title">
            Длительность
          </div>
          <transition name="fade">
            <div
              v-if="selectedDurationsValue[0] !== durationMin
                || selectedDurationsValue[1] !== durationMax"
              class="catalog-filters__reset"
              @click="onClickResetDurations"
              @keyup="onClickResetDurations"
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
              v-model:value="selectedDurationsValue"
              :min="durationMin"
              :max="durationMax"
              :step="durationStep"
              :label="getLabelDuration"
              @change="onChangeDurations"
            />
          </div>
        </div>

        <div
          v-if="schools?.length"
          key="schools"
          class="catalog-filters__block"
        >
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
              :simple="schools.length < 11"
              @load-items="onLoadItems('schools', $event)"
            />
          </div>
        </div>

        <div
          v-if="categories?.length"
          key="categories"
          class="catalog-filters__block"
        >
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
              :simple="categories.length < 11"
              @load-items="onLoadItems('categories', $event)"
            />
          </div>
        </div>

        <div
          v-if="professions?.length"
          key="professions"
          class="catalog-filters__block"
        >
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
              :simple="professions.length < 11"
              @load-items="onLoadItems('professions', $event)"
            />
          </div>
        </div>

        <div
          v-if="teachers?.length"
          key="teachers"
          class="catalog-filters__block"
        >
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
              :simple="teachers.length < 11"
              @load-items="onLoadItems('teachers', $event)"
            />
          </div>
        </div>

        <div
          v-if="skills?.length"
          key="skills"
          class="catalog-filters__block"
        >
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
              :simple="skills.length < 11"
              @load-items="onLoadItems('skills', $event)"
            />
          </div>
        </div>

        <div
          v-if="tools?.length"
          key="tools"
          class="catalog-filters__block"
        >
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
              :simple="tools.length < 11"
              @load-items="onLoadItems('tools', $event)"
            />
          </div>
        </div>

        <div
          v-if="formats?.length"
          key="formats"
          class="catalog-filters__block"
        >
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

        <div
          v-if="levels?.length"
          key="levels"
          class="catalog-filters__block"
        >
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
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEqual } from 'lodash';
import {
  computed,
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
import ELevel from '@/enums/components/molecules/level';
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
  priceMin: {
    type: Number,
    required: false,
    default: 0,
  },
  priceMax: {
    type: Number,
    required: false,
    default: null,
  },
  priceStep: {
    type: Number,
    required: false,
    default: 1000,
  },
  selectedPrices: {
    type: Array as PropType<Array<number>>,
    required: false,
    default: () => [],
  },
  durationMin: {
    type: Number,
    required: false,
    default: 0,
  },
  durationMax: {
    type: Number,
    required: false,
    default: null,
  },
  durationStep: {
    type: Number,
    required: false,
    default: 1,
  },
  selectedDurations: {
    type: Array as PropType<Array<number>>,
    required: false,
    default: () => [],
  },
  directions: {
    type: Array as PropType<Array<IDirection>>,
    required: false,
    default: () => [],
  },
  selectedDirection: {
    type: Object as PropType<IDirection>,
    required: false,
    default: null,
  },
  ratings: {
    type: Array as PropType<Array<IRating>>,
    required: false,
    default: () => [],
  },
  selectedCredit: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedFree: {
    type: Boolean,
    required: false,
    default: false,
  },
  selectedRating: {
    type: Object as PropType<IRating>,
    required: false,
    default: null,
  },
  schools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  selectedSchools: {
    type: Array as PropType<Array<ISchool>>,
    required: false,
    default: () => [],
  },
  categories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  selectedCategories: {
    type: Array as PropType<Array<ICategory>>,
    required: false,
    default: () => [],
  },
  professions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  selectedProfessions: {
    type: Array as PropType<Array<IProfession>>,
    required: false,
    default: () => [],
  },
  teachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  selectedTeachers: {
    type: Array as PropType<Array<ITeacher>>,
    required: false,
    default: () => [],
  },
  skills: {
    type: Array as PropType<Array<ISkill>>,
    required: false,
    default: () => [],
  },
  selectedSkills: {
    type: Array as PropType<Array<ISkill>>,
    required: false,
    default: () => [],
  },
  tools: {
    type: Array as PropType<Array<ITool>>,
    required: false,
    default: () => [],
  },
  selectedTools: {
    type: Array as PropType<Array<ITool>>,
    required: false,
    default: () => [],
  },
  formats: {
    type: Array as PropType<Array<IFormat>>,
    required: false,
    default: () => [],
  },
  selectedFormat: {
    type: Object as PropType<IFormat>,
    required: false,
    default: null,
  },
  levels: {
    type: Array as PropType<Array<ILevel>>,
    required: false,
    default: () => [],
  },
  selectedLevels: {
    type: Array as PropType<Array<ILevel>>,
    required: false,
    default: () => [],
  },
  mobile: {
    type: Boolean,
    required: false,
    default: false,
  },
  availableCredit: {
    type: Boolean,
    required: false,
    default: true,
  },
  availableFree: {
    type: Boolean,
    required: false,
    default: true,
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
  selectedPrices,
  selectedDurations,
  selectedCredit,
  selectedFree,
} = toRefs(props);

const emit = defineEmits({
  'load-items': (_: string, __?: Function) => true,
  'update:selected-direction': (_: IDirection | null) => true,
  'update:selected-rating': (_: IRating | null) => true,
  'update:selected-schools': (_: Array<ISchool>) => true,
  'update:selected-categories': (_: Array<ICategory>) => true,
  'update:selected-professions': (_: Array<IProfession>) => true,
  'update:selected-teachers': (_: Array<ITeacher>) => true,
  'update:selected-skills': (_: Array<ISkill>) => true,
  'update:selected-tools': (_: Array<ITool>) => true,
  'update:selected-format': (_: IFormat | null) => true,
  'update:selected-levels': (_: Array<ILevel>) => true,
  'update:selected-prices': (_: Array<number>) => true,
  'update:selected-durations': (_: Array<number>) => true,
  'update:selected-credit': (_: Boolean) => true,
  'update:selected-free': (_: Boolean) => true,
  'change-prices': (_: Number | Array<Number>) => true,
  'change-durations': (_: Number | Array<Number>) => true,
});

//

const nameClass = computed(() => {
  const classes = [];

  if (props.mobile) {
    classes.push('catalog-filters--mobile');
  }

  return classes.join(' ');
});

//

const onLoadItems = (name: string, callback?: Function): void => {
  emit('load-items', name, callback);
};

//

const selectedDirectionValue = ref<IDirection | null>(selectedDirection.value);

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

  emit('update:selected-rating', selectedRatingValueFound || null);
});

watch(selectedRating, () => {
  selectedRatingValue.value = selectedRating.value?.value;
});

//

const onClickResetRating = (): void => {
  selectedRatingValue.value = null;
};

//

const selectedPricesValue = ref(selectedPrices.value);

watch(selectedPricesValue, () => {
  emit('update:selected-prices', selectedPricesValue.value);
});

watch(selectedPrices, () => {
  selectedPricesValue.value = selectedPrices.value;
});

const onClickResetPrices = (): void => {
  selectedPricesValue.value = [props.priceMin, props.priceMax];
};

const getLabelPrice = () => '₽';

const onChangePrices = (): void => {
  emit('change-prices', selectedPricesValue.value);
};

//

const selectedCreditValue = ref(selectedCredit.value);

watch(selectedCreditValue, () => {
  emit('update:selected-credit', selectedCreditValue.value);
});

watch(selectedCredit, () => {
  selectedCreditValue.value = selectedCredit.value;
});

//

const selectedFreeValue = ref(selectedFree.value);

watch(selectedFreeValue, () => {
  emit('update:selected-free', selectedFreeValue.value);
});

watch(selectedFree, () => {
  selectedFreeValue.value = selectedFree.value;
});

//

const selectedDurationsValue = ref(selectedDurations.value);

watch(selectedDurationsValue, () => {
  emit('update:selected-durations', selectedDurationsValue.value);
});

watch(selectedDurations, () => {
  selectedDurationsValue.value = selectedDurations.value;
});

const onClickResetDurations = (): void => {
  selectedDurationsValue.value = [props.durationMin, props.durationMax];
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

const onChangeDurations = (): void => {
  emit('change-durations', selectedDurationsValue.value);
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
  const selectedFormatValueFound = props.formats.find(
    (itm) => itm.value === selectedFormatValue.value,
  );

  emit('update:selected-format', selectedFormatValueFound || null);
});

watch(selectedFormat, () => {
  selectedFormatValue.value = selectedFormat.value?.value;
});

const onClickResetFormat = (): void => {
  selectedFormatValue.value = null;
};

//

const selectedLevelsValue = ref<Array<ELevel> | null>(
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
  const newValue: Array<ELevel> = selectedLevels.value?.map((itm) => itm.value);

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
