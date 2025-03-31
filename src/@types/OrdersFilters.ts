export const ORDERS_SORT_BY_API_OPTIONS = [
  "latest",
  "oldest",
  "price: highest to lowest",
  "price: lowest to highest",
  "delivery date: from future to overdue",
  "delivery date: from overdue to future"
] as const;

export type OrdersSortByApiOption = (typeof ORDERS_SORT_BY_API_OPTIONS)[number];

export const ORDERS_SORT_BY_OPTIONS_TRANSLATE = [
  "mais novos",
  "mais antigos",
  "preço: do maior para o menor",
  "preço: do menor para o maior",
  "data de entrega: das futuras para as atrasadas",
  "data de entrega: das atrasadas para as futuras"
] as const;

export type OrdersSortByTranslate =
  (typeof ORDERS_SORT_BY_OPTIONS_TRANSLATE)[number];

export const ordersSortByTranslate: Record<
  OrdersSortByTranslate,
  OrdersSortByApiOption
> = {
  "mais novos": "latest",
  "mais antigos": "oldest",
  "preço: do maior para o menor": "price: highest to lowest",
  "preço: do menor para o maior": "price: lowest to highest",

  "data de entrega: das futuras para as atrasadas":
    "delivery date: from future to overdue",

  "data de entrega: das atrasadas para as futuras":
    "delivery date: from overdue to future"
};

export const ORDERS_FILTERS_API_OPTIONS = [
  "pending",
  "done",
  "preparing",
  "delivery",
  "pick-up"
] as const;

export type OrdersFiltersApiOption =
  (typeof ORDERS_FILTERS_API_OPTIONS)[number];

export const ORDERS_FILTERS_OPTIONS_TRANSLATE = [
  "pendentes",
  "prontos",
  "preparando",
  "delivery",
  "buscar na loja"
] as const;

export type OrdersFiltersOptionsTranslate =
  (typeof ORDERS_FILTERS_OPTIONS_TRANSLATE)[number];

export const ordersFiltersTranslate: Record<
  OrdersFiltersOptionsTranslate,
  OrdersFiltersApiOption
> = {
  pendentes: "pending",
  prontos: "done",
  preparando: "preparing",
  delivery: "delivery",
  "buscar na loja": "pick-up"
};
