import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import ICourse from '@/interfaces/stores/course/course';

export default defineEventHandler(async (event): Promise<ICourse[]> => {
  const config = useRuntimeConfig();
  const cachedRatedCourses = await useStorage().getItem('redis:ratedCourses');

  if (cachedRatedCourses) {
    return cachedRatedCourses as ICourse[];
  }

  const path = config.public.development ? '/api/private/site/course/read/rated' : '/storage/json/courses/rated.json';
  const response = await axios.get<IResponseItems<ICourse>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem('redis:ratedCourses', response.data.data);

  return response.data.data;
});
