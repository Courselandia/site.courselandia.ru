import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';

export default defineEventHandler(async (event): Promise<ISchool[]> => {
  const config = useRuntimeConfig();
  const cachedSchools = await useStorage().getItem('redis:schools');

  if (cachedSchools) {
    return cachedSchools as ISchool[];
  }

  const response = await axios.get<IResponseItems<ISchool>>('/api/private/site/school/read', {
    baseURL: config.public.apiUrl,
  });

  console.dir(response.data.data);

  await useStorage().setItem('redis:schools', response.data.data);

  return response.data.data;
});
