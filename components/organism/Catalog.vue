<template>
  <div>
    <CatalogHeader>
      <template #title>
        Онлайн курсы по Дизайну
      </template>
      <template #description>
        Пройдя курсы от лучших онлайн-школ, вы научитесь моделировать и
        визуализировать 3D-объекты, создавать дизайн одежды, интерьеров
        или даже проектировать дизайны различных торговых центров,
        скверов и парков, анимировать картинки, разрабатывать UX/UI-дизайн
        и дизайн мобильных приложений, а также многое другое.
      </template>
      <template #section>
        <div class="catalog-header__fire" />
        <div class="catalog-header__label">
          Сейчас в тренде
        </div>
      </template>
      <template #tags>
        <Tags>
          <Tag
            to="/courses/direction/programmer"
            bck="white"
            shadow
          >
            Программирование
          </Tag>
          <Tag
            to="/courses/direction/marketing"
            bck="white"
            shadow
          >
            Маркетинг
          </Tag>
          <Tag
            to="/courses/direction/marketing"
            bck="white"
            shadow
          >
            Дизайн
          </Tag>
          <Tag
            to="/courses/direction/marketing"
            bck="white"
            shadow
          >
            Бизнес и управление
          </Tag>
          <Tag
            to="/courses/direction/marketing"
            bck="white"
            shadow
          >
            Аналитика
          </Tag>
          <Tag
            to="/courses/direction/marketing"
            bck="white"
            shadow
          >
            Игры
          </Tag>
        </Tags>
      </template>
    </CatalogHeader>

    <CatalogHeader>
      <template #title>
        Онлайн курсы школы Skillbox
      </template>
      <template #description>
        Skillbox — это одна из крупнейших образовательных платформ на российском рынке.
        Она предоставляет более 500 образовательных курсов по различным тематикам,
        начиная с программирования и аналитики и заканчивая модой и флористикой.
      </template>
      <template #rating>
        4.5
      </template>
      <template #reviews>
        <nuxt-link to="/">
          1236 отзывов
        </nuxt-link>
      </template>
      <template #image>
        <img src="https://loc-api.courselandia.ru/storage/uploaded/images/schools/1.png" alt="" title="" />
      </template>
      <template #teachers>
        2300
      </template>
      <template #action>
        <Button
          to="/"
          link="link"
          target="_blank"
        >
          Перейти на сайт
        </Button>
      </template>
    </CatalogHeader>

    <div class="catalog">
      <div class="content">
        <div class="catalog__content">
          <div class="catalog__items">
            <div class="catalog__tools">
              <CatalogTools
                v-model:sort="sort"
                v-model:type="type"
              >
                <template #filtersMobile>
                  <CatalogFiltersMobile
                    :total="total"
                    :total-filters="totalFilters"
                  />
                </template>
              </CatalogTools>
            </div>
            <div class="catalog__tags">
              <ClientOnly>
                <CatalogTags
                  v-model:selected-direction="selectedDirection"
                  v-model:selected-rating="selectedRating"
                  v-model:selected-schools="selectedSchools"
                  v-model:selected-categories="selectedCategories"
                  v-model:selected-professions="selectedProfessions"
                  v-model:selected-teachers="selectedTeachers"
                  v-model:selected-skills="selectedSkills"
                  v-model:selected-tools="selectedTools"
                  v-model:selected-format="selectedFormat"
                  v-model:selected-levels="selectedLevels"
                  v-model:selected-prices="selectedPrices"
                  v-model:selected-durations="selectedDurations"
                  v-model:selected-credit="selectedCredit"
                  v-model:selected-free="selectedFree"
                  :price-min="priceMin"
                  :price-max="priceMax"
                  :duration-min="durationMin"
                  :duration-max="durationMax"
                  :directions="directions"
                  :schools="schools"
                  :categories="categories"
                  :professions="professions"
                  :teachers="teachers"
                  :skills="skills"
                  :tools="tools"
                  :ratings="ratings"
                  :formats="formats"
                  :levels="levels"
                  :total-filters="totalFilters"
                  reset-all
                  @remove="onChangeFilter"
                />
              </ClientOnly>
            </div>
            <div class="catalog__courses">
              <Courses
                :courses="courses"
                :columns="3"
              />
            </div>
            <div class="catalog__pagination">
              <Pagination
                :total="total"
                :size="size"
                :page="currentPage"
                :link="getLinkPagination"
              />
            </div>
          </div>
          <div class="catalog__filter">
            <CatalogFilters
              v-model:selected-direction="selectedDirection"
              v-model:selected-rating="selectedRating"
              v-model:selected-schools="selectedSchools"
              v-model:selected-categories="selectedCategories"
              v-model:selected-professions="selectedProfessions"
              v-model:selected-teachers="selectedTeachers"
              v-model:selected-skills="selectedSkills"
              v-model:selected-tools="selectedTools"
              v-model:selected-format="selectedFormat"
              v-model:selected-levels="selectedLevels"
              v-model:selected-prices="selectedPrices"
              v-model:selected-durations="selectedDurations"
              v-model:selected-credit="selectedCredit"
              v-model:selected-free="selectedFree"
              :price-min="priceMin"
              :price-max="priceMax"
              :price-step="priceStep"
              :duration-min="durationMin"
              :duration-max="durationMax"
              :duration-step="durationStep"
              :directions="directions"
              :ratings="ratings"
              :schools="schools"
              :categories="categories"
              :professions="professions"
              :teachers="teachers"
              :skills="skills"
              :tools="tools"
              :formats="formats"
              :levels="levels"
              :available-credit="availableCredit"
              :available-free="availableFree"
              @load-items="onLoadItems"
              @change-prices="onChangePrices"
              @change-durations="onChangeDurations"
              @change="onChangeFilter"
            />
          </div>
        </div>
      </div>
    </div>

    <LazyClientOnly>
      <teleport to="#catalog-filters-mobile">
        <CatalogFilters
          v-model:selected-direction="selectedDirection"
          v-model:selected-rating="selectedRating"
          v-model:selected-schools="selectedSchools"
          v-model:selected-categories="selectedCategories"
          v-model:selected-professions="selectedProfessions"
          v-model:selected-teachers="selectedTeachers"
          v-model:selected-skills="selectedSkills"
          v-model:selected-tools="selectedTools"
          v-model:selected-format="selectedFormat"
          v-model:selected-levels="selectedLevels"
          v-model:selected-prices="selectedPrices"
          v-model:selected-durations="selectedDurations"
          v-model:selected-credit="selectedCredit"
          v-model:selected-free="selectedFree"
          :price-min="priceMin"
          :price-max="priceMax"
          :price-step="priceStep"
          :duration-min="durationMin"
          :duration-max="durationMax"
          :duration-step="durationStep"
          :directions="directions"
          :ratings="ratings"
          :schools="schools"
          :categories="categories"
          :professions="professions"
          :teachers="teachers"
          :skills="skills"
          :tools="tools"
          :formats="formats"
          :levels="levels"
          :available-credit="availableCredit"
          :available-free="availableFree"
          mobile
          @load-items="onLoadItems"
          @change-prices="onChangePrices"
          @change-durations="onChangeDurations"
          @change="onChangeFilter"
        />
      </teleport>

      <teleport to="#catalog-filters-mobile-tags">
        <CatalogTags
          v-model:selected-direction="selectedDirection"
          v-model:selected-rating="selectedRating"
          v-model:selected-schools="selectedSchools"
          v-model:selected-categories="selectedCategories"
          v-model:selected-professions="selectedProfessions"
          v-model:selected-teachers="selectedTeachers"
          v-model:selected-skills="selectedSkills"
          v-model:selected-tools="selectedTools"
          v-model:selected-format="selectedFormat"
          v-model:selected-levels="selectedLevels"
          v-model:selected-prices="selectedPrices"
          v-model:selected-durations="selectedDurations"
          v-model:selected-credit="selectedCredit"
          v-model:selected-free="selectedFree"
          :price-min="priceMin"
          :price-max="priceMax"
          :duration-min="durationMin"
          :duration-max="durationMax"
          :directions="directions"
          :schools="schools"
          :categories="categories"
          :professions="professions"
          :teachers="teachers"
          :skills="skills"
          :tools="tools"
          :ratings="ratings"
          :formats="formats"
          :levels="levels"
          :total-filters="totalFilters"
          @remove="onChangeFilter"
        />
      </teleport>
    </LazyClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {
  computed,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';

import { apiReadCategories } from '@/api/category';
import { apiReadCourses } from '@/api/course';
import { apiReadProfessions } from '@/api/profession';
import { apiReadSkills } from '@/api/skill';
import { apiReadTeachers } from '@/api/teacher';
import { apiReadTools } from '@/api/tool';
import Button from '@/components/atoms/Button.vue';
import Pagination from '@/components/atoms/Pagination.vue';
import Tag from '@/components/atoms/Tag.vue';
import CatalogFilters from '@/components/molecules/CatalogFilters.vue';
import CatalogFiltersMobile from '@/components/molecules/CatalogFiltersMobile.vue';
import CatalogHeader from '@/components/molecules/CatalogHeader.vue';
import CatalogTags from '@/components/molecules/CatalogTags.vue';
import CatalogTools from '@/components/molecules/CatalogTools.vue';
import Courses from '@/components/molecules/Courses.vue';
import Tags from '@/components/molecules/Tags.vue';
import {
  courseFilterStoreCategoriesToComponentCategories,
} from '@/converts/courseFilterStoreCategoriesToComponentCategories';
import {
  courseFilterStoreDirectionsToComponentDirections,
} from '@/converts/courseFilterStoreDirectionsToComponentDirections';
import {
  courseFilterStoreProfessionsToComponentProfessions,
} from '@/converts/courseFilterStoreProfessionsToComponentProfessions';
import { courseFilterStoreSchoolsToComponentSchools } from '@/converts/courseFilterStoreSchoolsToComponentSchools';
import { courseFilterStoreSkillsToComponentSkills } from '@/converts/courseFilterStoreSkillsToComponentSkills';
import { courseFilterStoreTeachersToComponentTeachers } from '@/converts/courseFilterStoreTeachersToComponentTeachers';
import { courseFilterStoreToolsToComponentTools } from '@/converts/courseFilterStoreToolsToComponentTools';
import { coursesStoreToCoursesComponent } from '@/converts/coursesStoreToCoursesComponent';
import ECourseSort from '@/enums/components/molecules/courseSort';
import ECourseType from '@/enums/components/molecules/courseType';
import ELevel from '@/enums/components/molecules/level';
import EFormat from '@/enums/stores/course/format';
import {
  countCategories,
  countLevels,
  countProfessions,
  countSchools,
  countSkills,
  countTeachers,
  countTools,
  hasDirection,
  hasFormat,
  hasRating,
} from '@/helpers/chekFilter';
import IApiReadCourses from '@/interfaces/api/course/apiReadCourses';
import ICategory from '@/interfaces/components/molecules/category';
import ICourse from '@/interfaces/components/molecules/course';
import IDirection from '@/interfaces/components/molecules/direction';
import IFormat from '@/interfaces/components/molecules/format';
import ILevel from '@/interfaces/components/molecules/level';
import IProfession from '@/interfaces/components/molecules/profession';
import IRating from '@/interfaces/components/molecules/rating';
import ISchool from '@/interfaces/components/molecules/schoolFilter';
import ISkill from '@/interfaces/components/molecules/skill';
import ITeacher from '@/interfaces/components/molecules/teacher';
import ITool from '@/interfaces/components/molecules/tool';
import IFilters from '@/interfaces/filters';
import ISorts from '@/interfaces/sorts';
import category from '@/stores/category';
import direction from '@/stores/direction';
import profession from '@/stores/profession';
import skill from '@/stores/skill';
import teacher from '@/stores/teacher';
import tool from '@/stores/tool';
import school from '@/stores/school';
import TValue from '@/types/value';

const props = defineProps({
  section: {
    type: String,
    required: false,
    default: null,
  },
});

const route = useRoute();
const { link } = route.params;
const { section } = toRefs(props);

const getUrlFilterQuery = (name: string): Array<string> => {
  const { query } = route;
  let foundResult: Array<string> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in query) {
    if (key.indexOf('filters[') !== -1 && key.indexOf(']') !== -1) {
      const value = query[key] as string;
      let resultValue: Array<string> = [];

      if (value?.indexOf(',') && value?.split(',').length > 1) {
        resultValue = value.split(',');
      } else if (value) {
        resultValue = [value];
      }

      const regex = /\[([A-Za-z0-9_.-]+)\]/;
      const found = key.match(regex);

      if (found?.length && found[1] && found[1] === name) {
        foundResult = resultValue;

        break;
      }
    }
  }

  return foundResult;
};

const getUrlQuery = (name: string): string | null => {
  const { query } = route;

  if (query[name]) {
    return query[name] as string;
  }

  return null;
};

const sort = ref<TValue>(ECourseSort.ALPHABETIC);
const valueQuery = getUrlQuery('sort');

if (valueQuery && Object.values(ECourseSort).includes(valueQuery as ECourseSort)) {
  sort.value = valueQuery;
}

const type = ref<TValue>(ECourseType.TILE);

const courses = ref<ICourse[]>([]);

const total = ref(0);
const currentPage = ref(Number(getUrlQuery('page')) || 1);
const size = ref(36);

//

const selectedCredit = ref(false);
const availableCredit = ref(true);
const selectedFree = ref(false);
const availableFree = ref(true);

//

const priceMin = ref(0);
const priceMax = ref(0);
const priceStep = ref(1000);
const selectedPrices = ref<Array<number>>([priceMin.value, priceMax.value]);

//

const durationMin = ref(0);
const durationMax = ref(62);
const durationStep = ref(1);
const selectedDurations = ref<Array<number>>([durationMin.value, durationMax.value]);

//

const directions = ref<IDirection[]>([]);
const selectedDirection = ref<IDirection | null>();
const schools = ref<ISchool[]>([]);
const categories = ref<ICategory[]>([]);
const professions = ref<IProfession[]>([]);
const teachers = ref<ITeacher[]>([]);
const skills = ref<ISkill[]>([]);
const tools = ref<ITool[]>([]);

const selectedFormat = ref<IFormat | null>();
const formats = ref<IFormat[]>([]);

//

const selectedLevels = ref<Array<ILevel>>([]);
const levels = ref<ILevel[]>([]);

//

const ratings = ref<IRating[]>([]);
const selectedRating = ref<IRating | null>();
const selectedSchools = ref<Array<ISchool>>([]);
const selectedCategories = ref<Array<ICategory>>([]);
const selectedProfessions = ref<Array<IProfession>>([]);
const selectedTeachers = ref<Array<ITeacher>>([]);
const selectedSkills = ref<Array<ISkill>>([]);
const selectedTools = ref<Array<ITool>>([]);

const getLinkPagination = (page: number): string => `/courses/?page=${page}`;

const totalFilters = computed((): number => {
  let count = 0;

  if (selectedDirection.value && hasDirection(directions.value, selectedDirection.value)) {
    count++;
  }

  if (selectedRating.value && hasRating(ratings.value, selectedRating.value?.value)) {
    count++;
  }

  if (selectedFormat.value && hasFormat(formats.value, selectedFormat.value)) {
    count++;
  }

  if (selectedCredit.value) {
    count++;
  }

  if (selectedFree.value) {
    count++;
  }

  if (
    !selectedFree.value
    && (
      selectedPrices.value[0] !== priceMin.value
      || selectedPrices.value[1] !== priceMax.value
    )
  ) {
    count++;
  }

  if (
    selectedDurations.value[0] !== durationMin.value
    || selectedDurations.value[1] !== durationMax.value
  ) {
    count++;
  }

  count += countSchools(schools.value, selectedSchools.value);
  count += countCategories(categories.value, selectedCategories.value);
  count += countProfessions(professions.value, selectedProfessions.value);
  count += countTeachers(teachers.value, selectedTeachers.value);
  count += countSkills(skills.value, selectedSkills.value);
  count += countTools(tools.value, selectedTools.value);
  count += countLevels(levels.value, selectedLevels.value.map((itm) => itm.value));

  return count;
});

const getFormats = (formatValues: Array<EFormat>): Array<IFormat> => {
  const result: Array<IFormat> = [];

  formatValues.forEach((val) => {
    if (val === EFormat.ONLINE) {
      result[result.length] = {
        label: 'Онлайн',
        value: true,
      };
    }

    if (val === EFormat.OFFLINE) {
      result[result.length] = {
        label: 'Офлайн',
        value: false,
      };
    }
  });

  return result;
};

const getLevels = (lvls: Array<ELevel>): Array<ILevel> => {
  const result: Array<ILevel> = [];

  if (lvls.indexOf(ELevel.JUNIOR) !== -1) {
    result[result.length] = {
      label: 'Для начинающих',
      value: ELevel.JUNIOR,
    };
  }

  if (lvls.indexOf(ELevel.MIDDLE) !== -1) {
    result[result.length] = {
      label: 'Для продвинутых',
      value: ELevel.MIDDLE,
    };
  }

  if (lvls.indexOf(ELevel.SENIOR) !== -1) {
    result[result.length] = {
      label: 'Для профессионалов',
      value: ELevel.SENIOR,
    };
  }

  return result;
};

const getRatings = (rtgs: Array<number>): Array<IRating> => {
  const result: Array<IRating> = [];

  if (rtgs.indexOf(4.5) !== -1) {
    result[result.length] = {
      label: '4.5 и выше',
      value: 4.5,
    };
  }

  if (rtgs.indexOf(4) !== -1) {
    result[result.length] = {
      label: '4.0 и выше',
      value: 4,
    };
  }

  if (rtgs.indexOf(3.5) !== -1) {
    result[result.length] = {
      label: '3.5 и выше',
      value: 3.5,
    };
  }

  if (rtgs.indexOf(3) !== -1) {
    result[result.length] = {
      label: '3.0 и выше',
      value: 3,
    };
  }

  return result;
};

const config = useRuntimeConfig();

const setCoursesAndFilters = (result: IApiReadCourses): void => {
  courses.value = coursesStoreToCoursesComponent(result.courses);
  total.value = result.total || 0;

  const storeDirections = result.filter?.directions || [];
  directions.value = courseFilterStoreDirectionsToComponentDirections(storeDirections);

  const storeCategories = result.filter?.categories || [];
  categories.value = courseFilterStoreCategoriesToComponentCategories(storeCategories);

  const storeProfessions = result.filter?.professions || [];
  professions.value = courseFilterStoreProfessionsToComponentProfessions(storeProfessions);

  const storeSchools = result.filter?.schools || [];
  schools.value = courseFilterStoreSchoolsToComponentSchools(storeSchools);

  const storeSkills = result.filter?.skills || [];
  skills.value = courseFilterStoreSkillsToComponentSkills(storeSkills);

  const storeTeachers = result.filter?.teachers || [];
  teachers.value = courseFilterStoreTeachersToComponentTeachers(storeTeachers);

  const storeTools = result.filter?.tools || [];
  tools.value = courseFilterStoreToolsToComponentTools(storeTools);

  availableCredit.value = result.filter?.credit === undefined ? true : result.filter?.credit;
  availableFree.value = result.filter?.free === undefined ? true : result.filter?.free;

  let toSetupPrice = false;

  if (
    priceMin.value === selectedPrices.value[0]
    && priceMax.value === selectedPrices.value[1]
  ) {
    toSetupPrice = true;
  }

  priceMin.value = result.filter?.price.min || 0;
  priceMax.value = result.filter?.price.max || 0;

  if (toSetupPrice) {
    selectedPrices.value = [priceMin.value, priceMax.value];
  }

  let toSetupDuration = false;

  if (
    durationMin.value === selectedDurations.value[0]
    && durationMax.value === selectedDurations.value[1]
  ) {
    toSetupDuration = true;
  }

  durationMin.value = result.filter?.duration.min || 0;
  durationMax.value = result.filter?.duration.max || 0;

  if (toSetupDuration) {
    selectedDurations.value = [durationMin.value, durationMax.value];
  }

  formats.value = getFormats(result.filter?.formats || []);

  levels.value = getLevels(result.filter?.levels || []);
  ratings.value = getRatings(result.filter?.ratings || []);
};

const setSelectedFiltersByQuery = (): void => {
  if (section.value === 'direction') {
    const { itemDirection } = storeToRefs(direction());

    if (itemDirection.value?.id) {
      selectedDirection.value = {
        id: itemDirection.value?.id,
      };
    }
  }

  if (section.value === 'school') {
    const { itemSchool } = storeToRefs(school());

    if (itemSchool.value?.id) {
      selectedSchools.value = [
        {
          id: itemSchool.value?.id,
        },
      ];
    }
  }

  if (section.value === 'category') {
    const { itemCategory } = storeToRefs(category());

    if (itemCategory.value?.id) {
      selectedCategories.value[0] = {
        id: itemCategory.value?.id,
      };
    }
  }

  if (section.value === 'profession') {
    const { itemProfession } = storeToRefs(profession());

    if (itemProfession.value?.id) {
      selectedProfessions.value[0] = {
        id: itemProfession.value?.id,
      };
    }
  }

  if (section.value === 'teacher') {
    const { itemTeacher } = storeToRefs(teacher());

    if (itemTeacher.value?.id) {
      selectedTeachers.value[0] = {
        id: itemTeacher.value?.id,
      };
    }
  }

  if (section.value === 'skill') {
    const { itemSkill } = storeToRefs(skill());

    if (itemSkill.value?.id) {
      selectedSkills.value[0] = {
        id: itemSkill.value?.id,
      };
    }
  }

  if (section.value === 'tool') {
    const { itemTool } = storeToRefs(tool());

    if (itemTool.value?.id) {
      selectedTools.value[0] = {
        id: itemTool.value?.id,
      };
    }
  }

  if (getUrlFilterQuery('direction')?.length) {
    selectedDirection.value = {
      id: Number(getUrlFilterQuery('direction')[0]),
    };
  }

  if (getUrlFilterQuery('rating')?.length) {
    selectedRating.value = {
      value: Number(getUrlFilterQuery('rating')[0]),
    };
  }

  if (getUrlFilterQuery('price')?.length === 2) {
    const price = getUrlFilterQuery('price').map((itm) => Number(itm));
    price[0] = price[0] >= 0 ? price[0] : 0;
    selectedPrices.value = price;
  }

  if (getUrlFilterQuery('credit')?.length) {
    selectedCredit.value = Boolean(getUrlFilterQuery('credit')[0]);
  }

  if (getUrlFilterQuery('free')?.length) {
    selectedFree.value = Boolean(getUrlFilterQuery('free')[0]);
  }

  if (getUrlFilterQuery('duration')?.length === 2) {
    const duration = getUrlFilterQuery('duration').map((itm) => Number(itm));
    duration[0] = duration[0] >= 0 ? duration[0] : 0;
    selectedDurations.value = duration;
  }

  if (getUrlFilterQuery('schools')?.length) {
    selectedSchools.value.concat(getUrlFilterQuery('schools').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('categories')?.length) {
    selectedCategories.value.concat(getUrlFilterQuery('categories').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('professions')?.length) {
    selectedProfessions.value.concat(getUrlFilterQuery('professions').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('skills')?.length) {
    selectedSkills.value.concat(getUrlFilterQuery('skills').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('teachers')?.length) {
    selectedTeachers.value.concat(getUrlFilterQuery('teachers').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('tools')?.length) {
    selectedTools.value.concat(getUrlFilterQuery('tools').map((itm) => ({
      id: Number(itm),
    })));
  }

  if (getUrlFilterQuery('online')?.length) {
    selectedFormat.value = {
      value: Boolean(getUrlFilterQuery('online')[0]),
    };
  }

  if (getUrlFilterQuery('levels')?.length) {
    selectedLevels.value = getUrlFilterQuery('levels').map((level) => ({
      value: level as ELevel,
    }));
  }
};

const load = async (
  pageValue: number = 0,
  sizeValue: number = 36,
  sorts: ISorts | null = null,
  filterCurrent: IFilters | null = null,
): Promise<void> => {
  try {
    const pageValueCurrent = pageValue !== 0 ? pageValue - 1 : pageValue;

    const result = await apiReadCourses(
      config.public.apiUrl,
      pageValueCurrent * sizeValue,
      sizeValue,
      sorts,
      filterCurrent,
    );

    setCoursesAndFilters(result);
  } catch (error: any) {
    console.log(error.message);
  }
};

const getSort = (val: TValue): ISorts => {
  const sorts: ISorts = {};

  if (val === ECourseSort.ALPHABETIC) {
    sorts.header = 'ASC';
  } else if (val === ECourseSort.DATE) {
    sorts.id = 'DESC';
  } else if (val === ECourseSort.RATING) {
    sorts.rating = 'DESC';
  } else if (val === ECourseSort.PRICE_ASC) {
    sorts.price = 'ASC';
  } else if (val === ECourseSort.PRICE_DESC) {
    sorts.price = 'DESC';
  } else if (val === ECourseSort.RELEVANCY) {
    sorts.relevance = 'DESC';
  }

  return sorts;
};

const getFilters = (): IFilters => {
  const filters: IFilters = {};

  if (selectedDirection.value?.id) {
    filters['directions-id'] = selectedDirection.value.id;
  }

  if (selectedRating.value?.value) {
    filters.rating = selectedRating.value?.value;
  }

  if (selectedSchools.value?.length) {
    filters['school-id'] = selectedSchools.value.map((item) => item.id);
  }

  if (selectedCategories.value?.length) {
    filters['categories-id'] = selectedCategories.value.map((item) => item.id);
  }

  if (selectedProfessions.value?.length) {
    filters['professions-id'] = selectedProfessions.value.map((item) => item.id);
  }

  if (selectedTeachers.value?.length) {
    filters['teachers-id'] = selectedTeachers.value.map((item) => item.id);
  }

  if (selectedSkills.value?.length) {
    filters['skills-id'] = selectedSkills.value.map((item) => item.id);
  }

  if (selectedTools.value?.length) {
    filters['tools-id'] = selectedTools.value.map((item) => item.id);
  }

  if (selectedFormat.value?.value === true || selectedFormat.value?.value === false) {
    filters.online = selectedFormat.value.value;
  }

  if (selectedLevels.value?.length) {
    filters['levels-level'] = selectedLevels.value.map((item) => item.value);
  }

  if (selectedPrices.value?.length
    && (
      selectedPrices.value[0] !== priceMin.value
      || selectedPrices.value[1] !== priceMax.value
    )
    && !selectedFree.value
  ) {
    filters.price = [selectedPrices.value[0], selectedPrices.value[1]];
  }

  if (selectedDurations.value?.length
    && (
      selectedDurations.value[0] !== durationMin.value
      || selectedDurations.value[1] !== durationMax.value
    )
  ) {
    filters.duration = [selectedDurations.value[0], selectedDurations.value[1]];
  }

  if (selectedCredit.value) {
    filters.credit = true;
  }

  if (selectedFree.value) {
    filters.free = true;
  }

  return filters;
};

const onLoadItems = async (name: string, callback?: Function): Promise<void> => {
  if (name === 'professions') {
    if (professions.value.length <= 11) {
      const result = await apiReadProfessions(config.public.apiUrl);
      professions.value = courseFilterStoreProfessionsToComponentProfessions(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'categories') {
    if (categories.value.length <= 11) {
      const result = await apiReadCategories(config.public.apiUrl);
      categories.value = courseFilterStoreCategoriesToComponentCategories(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'teachers') {
    if (teachers.value.length <= 11) {
      const result = await apiReadTeachers(config.public.apiUrl);
      teachers.value = courseFilterStoreTeachersToComponentTeachers(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'skills') {
    if (skills.value.length <= 11) {
      const result = await apiReadSkills(config.public.apiUrl);
      skills.value = courseFilterStoreSkillsToComponentSkills(result);
    }

    if (callback) {
      callback();
    }
  } else if (name === 'tools') {
    if (tools.value.length <= 11) {
      const result = await apiReadTools(config.public.apiUrl);
      tools.value = courseFilterStoreToolsToComponentTools(result);
    }

    if (callback) {
      callback();
    }
  }
};

try {
  setSelectedFiltersByQuery();
  const pageValueCurrent = currentPage.value !== 0 ? currentPage.value - 1 : currentPage.value;

  const result = await apiReadCourses(
    config.public.apiUrl,
    pageValueCurrent * size.value,
    size.value,
    getSort(sort.value),
    getFilters(),
  );
  setCoursesAndFilters(result);
} catch (error: any) {
  console.log(error.message);
}

//

const setUrlQuery = (
  pageValue: number = 0,
  sortsCurrent: ISorts | null = null,
  filtersCurrent: IFilters | null = null,
): void => {
  const queries: Array<string> = [];

  queries.push(`page=${encodeURIComponent(pageValue)}`);

  if (sortsCurrent) {
    if (sortsCurrent.header === 'ASC') {
      queries.push('sort=alphabetic');
    } else if (sortsCurrent.id === 'DESC') {
      queries.push('sort=date');
    } else if (sortsCurrent.rating === 'DESC') {
      queries.push('sort=rating');
    } else if (sortsCurrent.price === 'ASC') {
      queries.push('sort=price_asc');
    } else if (sortsCurrent.price === 'DESC') {
      queries.push('sort=price_desc');
    } else if (sortsCurrent.relevance === 'DESC') {
      queries.push('sort=relevance');
    }
  }

  const convertNameFilter = (name: string): string => {
    const names: Record<string, string> = {
      'directions-id': 'direction',
      'school-id': 'schools',
      'categories-id': 'categories',
      'professions-id': 'professions',
      'teachers-id': 'teachers',
      'skills-id': 'skills',
      'tools-id': 'tools',
      'levels-level': 'levels',
    };

    return names[name] || name;
  };

  if (filtersCurrent) {
    Object.keys(filtersCurrent).forEach((name) => {
      if (filtersCurrent[name]) {
        const nameParameter = `filters[${encodeURIComponent(convertNameFilter(name))}]`;
        if (typeof filtersCurrent[name] === 'string' || typeof filtersCurrent[name] === 'number') {
          queries.push(`${nameParameter}=${filtersCurrent[name]}`);
        } else if (typeof filtersCurrent[name] === 'boolean') {
          queries.push(`${nameParameter}=${filtersCurrent[name] ? 1 : 0}`);
        } else if (Array.isArray(filtersCurrent[name])) {
          const items = filtersCurrent[name] as Array<string | number | boolean>;
          const values = items.join(',');
          queries.push(`${nameParameter}=${values}`);
        }
      }
    });

    const query = queries.join('&');

    let url = window.location.href.split('?')[0];

    if (query) {
      url = `${url}?${query}`;
    }

    window.history.pushState(
      {},
      '',
      url,
    );
  }
};

const onFilterAndSort = async (): Promise<void> => {
  const filters: IFilters = getFilters();

  await load(currentPage.value, size.value, getSort(sort.value), filters);
  setUrlQuery(currentPage.value, getSort(sort.value), filters);
};

const onChangePrices = (): void => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 200);
};

const onChangeDurations = (): void => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 200);
};

const onChangeFilter = () => {
  window.setTimeout(() => {
    onFilterAndSort();
  }, 50);
};

watch(sort, () => {
  onFilterAndSort();
});
</script>

<style lang="scss">
@import "@/assets/scss/components/organism/catalog.scss";
</style>
