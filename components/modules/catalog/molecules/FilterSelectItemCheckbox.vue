<template>
  <div
    :class="`checkbox ${nameClass}`"
    @click="onClick"
    @keydown="onClick"
  >
    <div class="checkbox__box">
      <transition name="fade">
        <div
          v-if="checked"
          class="checkbox__checked"
        />
      </transition>
    </div>
    <div class="checkbox__label">
      {{ label }}
    </div>
    <input
      :name="name"
      :value="value"
      :checked="checked"
      type="checkbox"
      class="checkbox__element"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject,
} from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const selects = inject<any>('selects');
const onClickItem = inject<any>('onClickItem');

const instance = getCurrentInstance();

const checked = computed((): boolean => {
  if (selects?.value) {
    return selects.value.indexOf(props.value) !== -1;
  }

  return instance?.parent?.exposed?.input?.value?.indexOf(props.value) !== -1;
});

const onChangeValue = (val: string | number): void => {
  if (Array.isArray(selects.value)) {
    if (selects.value.indexOf(val) !== -1) {
      const index = selects.value?.indexOf(val);

      if (index > -1) {
        selects.value.splice(index, 1);
      }
    } else {
      selects.value?.push(val);
    }
  } else {
    selects.value = val;
  }
};

const onClick = (): void => {
  if (!props.disabled) {
    if (selects.value) {
      onChangeValue(props.value);
    } else {
      instance?.parent?.exposed?.onChangeValue(props.value);
    }

    onClickItem();
  }
};

const nameClass = computed(() => {
  const classes = [];

  if (checked.value) {
    classes.push('checkbox--checked');
  }

  if (props.disabled) {
    classes.push('checkbox--disabled');
  }

  return classes.join(' ');
});
</script>

<style lang="scss">
@import "assets/scss/components/atoms/form/checkbox";
</style>
