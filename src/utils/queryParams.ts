export const splitQueryParam = (queryParam: undefined | string | string[]) => {
  if (!queryParam) {
    return;
  }

  return typeof queryParam === "string" ? queryParam.split(",") : queryParam;
};

export const getLastValue = (queryParam: undefined | string | string[]) =>
  Array.isArray(queryParam) ? queryParam[queryParam.length - 1] : queryParam;
