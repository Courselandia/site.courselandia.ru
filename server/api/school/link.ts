import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ISchoolLink from '@/interfaces/stores/course/schoolLink';

export default defineEventHandler(async (event): Promise<ISchoolLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:school.link.${link}.${cacheDate}`;
  const cachedSchools = await useStorage().getItem(cacheIndex);

  if (cachedSchools) {
    return cachedSchools as ISchoolLink;
  }

  const path = config.public.development ? `/api/private/site/school/link/${link}` : `/storage/json/schools/${link}.json`;

  const response = await axios.get<IResponseItem<ISchoolLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
