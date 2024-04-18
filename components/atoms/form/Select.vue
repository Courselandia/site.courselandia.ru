<template>
  <div
    v-click-outside="onClickOutside"
    :class="`select ${nameClassSelect}`"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
    @focusin="onMouseOver"
    @focusout="onMouseLeave"
  >
    <div
      ref="headerRef"
      class="select__header"
      @keydown="onClick"
      @click="onClick"
    >
      <div :class="`select__title ${value === '' ? 'select__title--placeholder' : ''}`">
        {{ value ? getLabel(value) : placeholder }}
      </div>
      <div class="select__arrow">
        <Icon
          name="angle-down"
          color="blue2"
          :size="[12, 6]"
        />
      </div>
    </div>
    <teleport to="body">
      <transition
        name="fade"
        @enter="setDropdownPosition"
      >
        <div
          v-if="dropped"
          ref="dropdownRef"
          :class="`dropdown ${nameClassDropdown}`"
        >
          <div class="dropdown__list">
            <div
              v-for="(option) in options"
              :key="option.value as string"
              :class="`dropdown__option ${option.value === value ? 'dropdown__option--selected' : ''}`"
              @keydown="onSelect(option.value)"
              @click="onSelect(option.value)"
            >
              <div class="dropdown__label">
                {{ option.label }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
} from 'vue';
import {
  computed,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue';

import Icon from '@/components/atoms/Icon.vue';
import type IOption from '@/interfaces/components/atoms/option';
import type TLabel from '@/types/label';
import type TValue from '@/types/value';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Object as PropType<Array<IOption>>,
    required: true,
  },
  value: {
    type: String as PropType<TValue>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите значение',
  },
  border: {
    type: Boolean,
    default: true,
  },
  simple: {
    type: Boolean,
    default: false,
  },
});

const {
  value,
  simple,
} = toRefs(props);

const emit = defineEmits({
  'update:value': (_: TValue | null) => true,
  change: (_: TValue | null) => true,
});

const input = ref<TValue | null>(value.value);
const dropped = ref(false);
const hover = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

watch(input, () => {
  emit('update:value', input.value);
});

watch(value, () => {
  input.value = value.value;
});

const nameClassSelect = computed(() => {
  const classes = [];

  if (props.border) {
    classes.push('select--border');
  }

  if (dropped.value) {
    classes.push('select--dropped');
  }

  if (hover.value) {
    classes.push('select--hover');
  }

  if (simple.value) {
    classes.push('select--simple');
  }

  return classes.join(' ');
});

const nameClassDropdown = computed(() => {
  const classes = [];

  if (props.border) {
    classes.push('dropdown--border');
  }

  if (dropped.value) {
    classes.push('dropdown--dropped');
  }

  if (hover.value) {
    classes.push('dropdown--hover');
  }

  if (props.simple) {
    classes.push('dropdown--simple');
  }

  return classes.join(' ');
});

const onClick = (): void => {
  dropped.value = !dropped.value;
};

const setDropdownPosition = (): void => {
  if (dropdownRef.value && headerRef.value) {
    const bodyRect = document.body.getBoundingClientRect();
    const rectHeader = headerRef.value.getBoundingClientRect();

    if (!props.simple) {
      dropdownRef.value.style.width = `${rectHeader.width}px`;
    }

    const rectDropdown = dropdownRef.value.getBoundingClientRect();

    dropdownRef.value.style.left = `${rectHeader.left}px`;
    dropdownRef.value.style.top = `${rectHeader.top - bodyRect.top + rectHeader.height}px`;

    if ((rectHeader.left + rectDropdown.width) > window.screen.availWidth) {
      const ratio = rectDropdown.width - rectHeader.width;
      dropdownRef.value.style.left = `${rectHeader.left - ratio}px`;
    }
  }
};

const onSelect = (option: TValue | null): void => {
  input.value = option;
  dropped.value = false;
  hover.value = false;

  emit('change', option);
};

const onClickOutside = (): void => {
  dropped.value = false;
  hover.value = false;
};

const onMouseOver = (): void => {
  hover.value = true;
};

const onMouseLeave = (): void => {
  hover.value = false;
};

const getLabel = (val: String | Number): TLabel | null => {
  const optionFound = props.options.find((option) => option.value === val);

  return optionFound ? optionFound.label : null;
};

onMounted(() => {
  window.addEventListener('resize', () => {
    setDropdownPosition();
  });
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/atoms/form/select";
@import "@/assets/scss/components/atoms/form/dropdown";
</style>
