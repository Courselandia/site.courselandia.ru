import {
  connectCacheStore,
  createCacheStore,
} from './store';

export default defineNuxtPlugin(async (nuxtApp) => {
  createCacheStore('redis://127.0.0.1:6391');
  await connectCacheStore();
});
