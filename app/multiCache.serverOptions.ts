import { defineMultiCacheOptions } from 'nuxt-multi-cache/dist/runtime/serverOptions';
import redisDriver from 'unstorage/drivers/redis';

const config = useRuntimeConfig();

export default defineMultiCacheOptions({
  component: {
    storage: {
      driver: redisDriver({
        base: 'component:',
        host: config.public.redisHost,
        port: Number(config.public.redisPort),
      }),
    },
  },
});