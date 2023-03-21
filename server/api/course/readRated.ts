import axios from '@/helpers/axios';
import toQuery from '@/helpers/toQuery';
import { IResponseItems } from '@/interfaces/response';
import ICourse from '@/interfaces/stores/course/course';

export default defineEventHandler(async (event): Promise<ICourse[]> => {
  const config = useRuntimeConfig();
  const cachedRatedCourses = await useStorage().getItem('redis:ratedCourses');

  if (cachedRatedCourses) {
    return cachedRatedCourses as ICourse[];
  }

  const query = toQuery(null, 16);
  const response = await axios.get<IResponseItems<ICourse>>(`/api/private/site/course/read/rated?${query}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem('redis:ratedCourses', response.data.data);

  return response.data.data;
});
