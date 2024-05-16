import type {
  IResponseItems,
} from '@/interfaces/response';
import type ISchool from '@/interfaces/stores/promo/school';
import promo from '@/stores/promo';

export const apiReadPromos = async (
  fetch: boolean,
): Promise<IResponseItems<ISchool> | null> => {
  const {
    readPromos,
  } = promo();

  const loadPromos = async (): Promise<IResponseItems<ISchool>> => readPromos();

  if (fetch) {
    const resultPromos = await useAsyncData('promos', async () => loadPromos());

    return resultPromos.data.value || null;
  }

  return await loadPromos();
};
