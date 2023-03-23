const track = (goalName: string): void => {
  const config = useRuntimeConfig();

  if (window.ym) {
    window.ym(config.public.yandexMeasurementId, 'reachGoal', goalName);
  }
};

export default track;
