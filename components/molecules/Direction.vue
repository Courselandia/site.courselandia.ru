<template>
  <nuxt-link
    :to="link"
    class="direction"
  >
    <div class="direction__info">
      <div class="direction__label">
        {{ label }}
      </div>
      <div class="direction__amount">
        {{ amount }}
        <template v-if="amount === 0">
          курсов
        </template>
        <template v-else-if="amount === 1">
          курс
        </template>
        <template v-else-if="amount >= 2 && amount <= 4">
          курса
        </template>
        <template v-else-if="amount >= 5">
          курсов
        </template>
      </div>
    </div>
    <div class="direction__media">
      <img
        :src="image"
        :alt="label"
        :title="label"
        class="direction__image"
      />
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/components/molecules/direction.scss";
</style>
