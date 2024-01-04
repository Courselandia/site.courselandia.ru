import axios from '@/helpers/axios';
import type { IResponseItems } from '@/interfaces/response';
import type IDirection from '@/interfaces/stores/course/direction';

export default defineEventHandler(async (event): Promise<IDirection[]> => {
  const config = useRuntimeConfig();
  const cachedDirections = await useStorage().getItem('redis:directions');

  if (cachedDirections) {
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

  await useStorage().setItem('redis:directions', response.data.data);

  return response.data.data;
});
