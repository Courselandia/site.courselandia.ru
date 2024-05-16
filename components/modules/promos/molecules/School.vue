<template>
  <div class="school">
    <div class="school_logo">
      <Logo
        v-if="school.image_logo_id"
        :image="school.image_logo_id"
        :label="school.name"
      />
      <template
        v-else
      >
        {{ school.name }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/components/modules/promos/atoms/Logo.vue';
import type { PropType } from 'vue';
import type ISchool from '@/interfaces/stores/promo/school';

const props = defineProps({
  school: {
    type: Object as PropType<ISchool>,
    required: true,
  },
});
</script>
