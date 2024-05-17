import { getQuery } from 'h3';
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
  route: {
    buildCacheKey(event: any) {
      const { path } = event;

      if (path.startsWith('/reviews')) {
        const {
          sortBy,
          sortOrder,
          direction,
        } = getQuery(event);

        if (sortBy || sortOrder || direction) {
          return `reviews_${sortBy}_${sortOrder}_${direction}`;
        }
      }

      if (path.startsWith('/collections')) {
        const {
          direction,
          page,
        } = getQuery(event);

        if (direction || page) {
          return `reviews_${direction}_${page}`;
        }
      }

      if (path.startsWith('/blog')) {
        const {
          page,
        } = getQuery(event);

        if (page) {
          return `blog_${page}`;
        }
      }

      if (path.startsWith('/promos')) {
        const {
          direction,
        } = getQuery(event);

        if (direction) {
          return `promos_${direction}`;
        }
      }

      return path.split('?')[0];
    },
  },
});
