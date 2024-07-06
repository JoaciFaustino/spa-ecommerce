export const SORT_BY_API_OPTIONS = [
  "popularity",
  "latest",
  "price_high_to_low",
  "price_low_to_high"
] as const;

export type TypeKeysSortBy = (typeof SORT_BY_API_OPTIONS)[number];

export type sortByApiOptions = {
  [key: string]: string | undefined;
};
