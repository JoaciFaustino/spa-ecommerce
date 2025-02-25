import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export const useOrderDashboardFilters = () => {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withOptions({ clearOnDefault: true, shallow: false })
  );

  const [filters, setFilters] = useQueryState(
    "filters",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  return { sortBy, setSortBy, filters, setFilters };
};
