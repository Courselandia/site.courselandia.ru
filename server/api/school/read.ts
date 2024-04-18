import axios from '@/helpers/axios';
import type { IResponseItems } from '@/interfaces/response';
import type ISchool from '@/interfaces/stores/school/school';

export default defineEventHandler(async (event): Promise<ISchool[]> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:schools.${cacheDate}`;
  const cachedSchools = await useStorage().getItem(cacheIndex);

  if (cachedSchools && !config.public.development) {
    return cachedSchools as ISchool[];
  }

  const path = config.public.development ? '/api/private/site/school/read' : '/storage/json/schools.json';
  const response = await axios.get<IResponseItems<ISchool>>(path, {
    baseURL: config.public.apiUrl,
  });

  if (!config.public.development) {
    await useStorage().setItem(cacheIndex, response.data.data);
  }

  return response.data.data;
});
