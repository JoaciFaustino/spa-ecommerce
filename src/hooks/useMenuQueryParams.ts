import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export const useMenuQueryParams = () => {
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withOptions({ clearOnDefault: true, shallow: false })
  );

  const [type, setType] = useQueryState(
    "type",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  const [frosting, setFrosting] = useQueryState(
    "frosting",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  const [category, setCategory] = useQueryState(
    "category",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  const [size, setSize] = useQueryState(
    "size",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  const [filling, setFilling] = useQueryState(
    "filling",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false,
      throttleMs: 300
    })
  );

  return {
    sortBy,
    setSortBy,
    type,
    setType,
    frosting,
    setFrosting,
    category,
    setCategory,
    size,
    setSize,
    filling,
    setFilling
  };
};
