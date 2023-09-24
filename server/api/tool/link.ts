import axios from '@/helpers/axios';
import { IResponseItem } from '@/interfaces/response';
import IToolLink from '@/interfaces/stores/course/toolLink';

export default defineEventHandler(async (event): Promise<IToolLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cachedTools = await useStorage().getItem(`redis:tool.link.${link}`);

  if (cachedTools) {
    return cachedTools as IToolLink;
  }

  const response = await axios.get<IResponseItem<IToolLink>>(`/api/private/site/tool/link/${link}`, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(`redis:tool.link.${link}`, response.data.data);

  return response.data.data;
});
