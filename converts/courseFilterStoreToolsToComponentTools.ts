import ITool from '@/interfaces/components/molecules/tool';
import IFilterTool from '@/interfaces/stores/course/filterTool';

export const courseFilterStoreToolsToComponentTools = (
  tools: Array<IFilterTool>,
): Array<ITool> => {
  const result: Array<ITool> = [];

  tools.forEach((tool) => {
    result[result.length] = {
      id: tool.id,
      label: tool.name,
      link: tool.link,
      disabled: tool.disabled,
    };
  });

  return result;
};
