import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import ITeacherLink from '@/interfaces/stores/course/teacherLink';

export default defineEventHandler(async (event): Promise<ITeacherLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedTeachers = await useStorage().getItem(`redis:teacher.link.${link}`);

  if (cachedTeachers) {
    return cachedTeachers as ITeacherLink;
  }

  const response = await axios.get<IResponseItem<ITeacherLink>>(`/api/private/site/teacher/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:teacher.link.${link}`, response.data.data);

  return response.data.data;
});
