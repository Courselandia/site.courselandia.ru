import axios from '@/helpers/axios';
import type { IResponseItem } from '@/interfaces/response';
import type ISkillLink from '@/interfaces/stores/course/skillLink';

export default defineEventHandler(async (event): Promise<ISkillLink | null> => {
  const config = useRuntimeConfig();
  const urlParams = new URLSearchParams(event.node.req.url?.split('?')[1]);
  const link = urlParams.get('link');
  const cacheDate = urlParams.get('cacheDate');
  const cacheIndex = `redis:skill.link.${link}.${cacheDate}`;
  const cachedSkills = await useStorage().getItem(cacheIndex);

  if (cachedSkills) {
    return cachedSkills as ISkillLink;
  }

  const path = config.public.development ? `/api/private/site/skill/link/${link}` : `/storage/json/skills/${link}.json`;
  const response = await axios.get<IResponseItem<ISkillLink>>(path, {
    baseURL: config.public.apiUrl,
  });

  await useStorage().setItem(cacheIndex, response.data.data);

  return response.data.data;
});
