import { parseAsString, useQueryState } from "nuqs";

export const useMenuQueryParams = () => {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withOptions({
      clearOnDefault: true,
      shallow: false
    })
  );

  return { sortBy, setSortBy };
};
