export const cachedRequestsRevalidateTags = [
  "first-cakes-page",
  "first-cake-types-page",
  "first-categories-page",
  "first-frostings-page",
  "first-fillings-page",
  "first-orders-page"
] as const;

export type CachedRequestsRevalidateTag =
  (typeof cachedRequestsRevalidateTags)[number];
