import { IResponseItems } from '@/interfaces/response';
import IFaq from '@/interfaces/stores/faq/faq';
import faq from '@/stores/faq';

const faqItems: Record<string, Array<IFaq>> = {};

export const apiReadFaqs = async (apiUrl: string, school: string): Promise<Array<IFaq>> => {
  const {
    readFaqs,
  } = faq();

  const loadFaqs = async ():
    Promise<IResponseItems<IFaq>> => readFaqs(apiUrl, school);

  if (faqItems[school]?.length) {
    return faqItems[school];
  }

  const resultFaqs = await useAsyncData('faqs', async () => loadFaqs());

  faqItems[school] = resultFaqs.data.value?.data;

  return faqItems[school];
};
