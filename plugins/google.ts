// eslint-disable-next-line import/no-extraneous-dependencies
import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  if (!config.public.development) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.googleMeasurementId,
      },
    });
  }
});
