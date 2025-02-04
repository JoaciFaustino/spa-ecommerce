import { CakeQueryParams } from "@/@types/QueryParams";
import { sortByApiOptions } from "@/@types/SortBy";
import { getAllCakes, getFirstPageCakesCached } from "@/services/cakes";

const SORT_BY_API_OPTIONS: sortByApiOptions = {
  popularidade: "popularity",
  novos: "latest",
  "preço: do maior para o menor": "price_high_to_low",
  "preço: do menor para o maior": "price_low_to_high"
};

const splitQueryParam = (queryParam: undefined | string | string[]) => {
  if (!queryParam) {
    return;
  }

  return typeof queryParam === "string" ? queryParam.split(",") : queryParam;
};

export const getInitialCakes = async (searchParams: CakeQueryParams) => {
  const { sortBy, category, filling, frosting, search, size, type } =
    searchParams;

  const sortByLastValue = Array.isArray(sortBy)
    ? sortBy[sortBy.length - 1]
    : sortBy;

  try {
    const shouldGetCachedCakes: boolean =
      (!sortBy || sortBy === "popularidade") &&
      (!category || category.length === 0) &&
      (!filling || filling.length === 0) &&
      (!frosting || frosting.length === 0) &&
      (!search || search.length === 0) &&
      (!size || size.length === 0) &&
      (!type || type.length === 0);

    if (shouldGetCachedCakes) {
      const { cakes, nextUrl } = await getFirstPageCakesCached();

      return { cakes, nextUrl };
    }

    const { cakes, nextUrl } = await getAllCakes({
      limit: "12",
      page: "1",
      search,
      type: splitQueryParam(type),
      category: splitQueryParam(category),
      size: splitQueryParam(size),
      filling: splitQueryParam(filling),
      frosting: splitQueryParam(frosting),
      sortBy: SORT_BY_API_OPTIONS[sortByLastValue || ""] ?? undefined
    });

    return { cakes, nextUrl };
  } catch (error) {
    throw error;
  }
};
