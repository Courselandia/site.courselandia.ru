// @ts-ignore
import FloatingVue from 'floating-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      'info-tooltip': {
        $extend: 'tooltip',
      },
    },
  });
});
