import axios from '@/helpers/axios';
import type { IResponseItems } from '@/interfaces/response';
import type ICourse from '@/interfaces/stores/course/course';

export default defineEventHandler(async (event): Promise<ICourse[]> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:ratedCourses.${cacheDate}`;
  const cachedRatedCourses = await useStorage().getItem(cacheIndex);

  if (cachedRatedCourses) {
    return cachedRatedCourses as ICourse[];
  }

  const path = config.public.development ? '/api/private/site/course/read/rated' : '/storage/json/courses/rated.json';
  const response = await axios.get<IResponseItems<ICourse>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
