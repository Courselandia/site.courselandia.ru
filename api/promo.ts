import ECacheDate from '@/enums/cache';
import type {
  IResponseItem,
  IResponseItems,
} from '@/interfaces/response';
import type ISchool from '@/interfaces/stores/promo/school';
import promo from '@/stores/promo';

export const apiReadPromos = async (
  fetch: boolean,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<Array<ISchool>> => {
  const {
    readPromos,
  } = promo();

  const loadPromos = async (): Promise<IResponseItems<ISchool>> => readPromos(cacheDate);

  if (fetch) {
    const resultPromos = await useAsyncData('promos', async () => loadPromos());

    return resultPromos.data.value?.data || [];
  }

  const result = await loadPromos();

  return result.data;
};

export const apiLinkPromo = async (
  link: string,
  cacheDate: ECacheDate = ECacheDate.DAY,
): Promise<ISchool | null> => {
  const {
    linkPromo,
  } = promo();

  const loadPromo = async (): Promise<IResponseItem<ISchool>> => linkPromo(link, cacheDate);

  const resultPromo = await useAsyncData('promo', async () => loadPromo());

  return resultPromo.data.value?.data || null;
};
