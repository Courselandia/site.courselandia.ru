// @ts-ignore
import FloatingVue from 'floating-vue';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      'info-tooltip': {
        $extend: 'tooltip',
      },
    },
  });
});
