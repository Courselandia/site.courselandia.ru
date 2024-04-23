import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type IStat from '@/interfaces/stores/course/stat';

export default defineEventHandler(async (event): Promise<IStat | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:stat.${cacheDate}`;
  const cachedStat = await useStorage().getItem(cacheIndex);

  if (cachedStat && !config.public.development) {
    return cachedStat as IStat;
  }

  const path = config.public.development ? '/api/private/site/course/stat' : '/storage/json/stat.json';
  const response = await axios.get<IResponseItem<IStat>>(path, {
    baseURL: config.public.apiUrl,
  });

  if (!config.public.development) {
    await useStorage().setItem(cacheIndex, response.data.data);
  }

  return response.data.data;
});
