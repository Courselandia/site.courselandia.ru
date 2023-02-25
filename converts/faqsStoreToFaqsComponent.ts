import IFaqComponent from '@/interfaces/components/molecules/faq';
import IFaqStore from '@/interfaces/stores/faq/faq';

const faqsStoreToFaqsComponent = (
  faqs: Array<IFaqStore>,
): Array<IFaqComponent> => {
  const result: Array<IFaqComponent> = [];

  faqs.forEach((faq) => {
    const index = result.length;

    result[index] = {
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    };
  });

  return result;
};

export default faqsStoreToFaqsComponent;
