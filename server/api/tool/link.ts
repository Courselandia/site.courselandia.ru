import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type IToolLink from '@/interfaces/stores/course/toolLink';

export default defineEventHandler(async (event): Promise<IToolLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:tool.link.${link}.${cacheDate}`;
  const cachedTools = await useStorage().getItem(cacheIndex);

  if (cachedTools) {
    return cachedTools as IToolLink;
  }

  const path = config.public.development ? `/api/private/site/tool/link/${link}` : `/storage/json/tools/${link}.json`;
  const response = await axios.get<IResponseItem<IToolLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
