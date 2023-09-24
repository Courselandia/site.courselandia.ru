import axios from '@/helpers/axios';
import { IResponseItems } from '@/interfaces/response';
import ISchool from '@/interfaces/stores/school/school';

export default defineEventHandler(async (event): Promise<ISchool[]> => {
  const config = useRuntimeConfig();
  const cachedSchools = await useStorage().getItem('redis:schools');

  if (cachedSchools) {
    return cachedSchools as ISchool[];
  }

  const path = config.public.development ? '/api/private/site/school/read' : '/storage/json/schools.json';
  const response = await axios.get<IResponseItems<ISchool>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem('redis:schools', response.data.data);

  return response.data.data;
});
