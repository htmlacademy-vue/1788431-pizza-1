export const getDefaultDoughValue = (doughs) => {
  const defaultDough = doughs.find((dough) => dough.default);
  return defaultDough ? defaultDough.value : null;
};

export const getDefaultSauceValue = (sauces) => {
  const defaultSauce = sauces.find((sauce) => sauce.default);
  return defaultSauce ? defaultSauce.value : null;
};

export const getDefaultSizeValue = (sizes) => {
  const defaultSize = sizes.find((size) => size.default);
  return defaultSize ? defaultSize.value : null;
};
