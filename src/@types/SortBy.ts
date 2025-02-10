export const SORT_BY_API_OPTIONS = [
  "popularity",
  "latest",
  "price_high_to_low",
  "price_low_to_high"
] as const;

export type SortBy = (typeof SORT_BY_API_OPTIONS)[number];

export const SORT_BY_API_OPTIONS_TRANSLATES = [
  "popularidade",
  "novos",
  "preço: do maior para o menor",
  "preço: do menor para o maior"
] as const;

export type SortByApiOptionsTranslate =
  (typeof SORT_BY_API_OPTIONS_TRANSLATES)[number];

export const sortByApiOptionsTranslate: Record<
  SortByApiOptionsTranslate,
  SortBy
> = {
  popularidade: "popularity",
  novos: "latest",
  "preço: do maior para o menor": "price_high_to_low",
  "preço: do menor para o maior": "price_low_to_high"
};
