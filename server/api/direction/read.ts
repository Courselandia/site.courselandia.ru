import axios from '@/helpers/axios';
import type { IResponseItems } from '@/interfaces/response';
import type IDirection from '@/interfaces/stores/course/direction';

export default defineEventHandler(async (event): Promise<IDirection[]> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:directions.${cacheDate}`;
  const cachedDirections = await useStorage().getItem(cacheIndex);

  if (cachedDirections && !config.public.development) {
    return cachedDirections as IDirection[];
  }

  const path = config.public.development ? '/api/private/site/course/directions' : '/storage/json/directions.json';

  const response = await axios.get<IResponseItems<IDirection>>(path, {
    baseURL: config.public.apiUrl,
    params: {
      withCategories: 1,
      withCount: 1,
    },
  });

  if (!config.public.development) {
    await useStorage().setItem(cacheIndex, response.data.data);
  }

  return response.data.data;
});
