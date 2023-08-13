const plural = (number: number, conditions: Record<string | number, string>): string | null => {
  let max: number = 0;
  let index: string | number | null = null;

  Object.keys(conditions)
    .forEach((condition: string | number) => {
      if (condition.toString().indexOf('+') >= 0) {
        const conditionNumber = Number(condition.toString()
          .replace('+', ''));

        if (number >= conditionNumber && conditionNumber > max) {
          max = conditionNumber;
          index = condition;
        }
      } else {
        const conditionNumber = Number(condition);

        if (number >= conditionNumber && conditionNumber > max) {
          max = conditionNumber;
          index = condition;
        }
      }
    });

  if (index) {
    return conditions[index];
  }

  return null;
};

export default plural;