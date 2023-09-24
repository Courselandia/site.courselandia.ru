import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import IProfessionLink from '@/interfaces/stores/course/professionLink';

export default defineEventHandler(async (event): Promise<IProfessionLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedProfessions = await useStorage().getItem(`redis:profession.link.${link}`);

  if (cachedProfessions) {
    return cachedProfessions as IProfessionLink;
  }

  const response = await axios.get<IResponseItem<IProfessionLink>>(`/api/private/site/profession/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:profession.link.${link}`, response.data.data);

  return response.data.data;
});
