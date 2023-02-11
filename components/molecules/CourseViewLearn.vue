<template>
  <Numerics>
    <Numeric number="1">
      Создавать анимированные изображения
    </Numeric>
    <Numeric number="2">
      Моделировать с помощью скриптов на Python
    </Numeric>
    <Numeric number="3">
      Анимировать природные явления
    </Numeric>
    <Numeric number="4">
      Работать в Houdini
    </Numeric>
    <Numeric number="5">
      Настраивать рендеринг
    </Numeric>
  </Numerics>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import Numeric from '@/components/atoms/Numeric.vue';
import Numerics from '@/components/molecules/Numerics.vue';
import ICourse from '@/interfaces/components/molecules/course';

const props = defineProps({
  course: {
    type: Object as PropType<ICourse>,
    required: true,
  },
});
</script>
