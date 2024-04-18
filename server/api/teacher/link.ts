import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ITeacherLink from '@/interfaces/stores/course/teacherLink';

export default defineEventHandler(async (event): Promise<ITeacherLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:teacher.link.${link}.${cacheDate}`;
  const cachedTeachers = await useStorage().getItem(cacheIndex);

  if (cachedTeachers && !config.public.development) {
    return cachedTeachers as ITeacherLink;
  }

  const path = config.public.development ? `/api/private/site/teacher/link/${link}` : `/storage/json/teachers/${link}.json`;
  const response = await axios.get<IResponseItem<ITeacherLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  if (!config.public.development) {
    await useStorage().setItem(cacheIndex, response.data.data);
  }

  return response.data.data;
});
