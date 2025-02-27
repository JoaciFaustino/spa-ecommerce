import { CakeQueryParams } from "@/@types/QueryParams";
import { getAllCakes } from "@/services/cakes";
import { getAllCakeTypes } from "@/services/cakeTypes";
import { getAllCategories } from "@/services/categories";
import { getLastValue, splitQueryParam } from "./queryParams";
import { getAllFrostings } from "@/services/frostings";
import { getAllFillings } from "@/services/fillings";

const limit = 24;
const page = 1;

export const getInitialCakes = async (searchParams: CakeQueryParams) => {
  const { sortBy, category, filling, frosting, search, size, type } =
    searchParams;

  try {
    const { cakes, nextUrl } = await getAllCakes({
      limit: "24",
      page: "1",
      search,
      type: splitQueryParam(type),
      category: splitQueryParam(category),
      size: splitQueryParam(size),
      filling: splitQueryParam(filling),
      frosting: splitQueryParam(frosting),
      sortBy
    });

    return { cakes, nextUrl };
  } catch (error) {
    throw error;
  }
};

type SearchParams = { search?: string | string[] };

export const getInitialCakeTypes = async ({ search }: SearchParams) => {
  try {
    const { cakeTypes, nextUrl } = await getAllCakeTypes(
      limit,
      page,
      getLastValue(search)
    );

    return { cakeTypes, nextUrl };
  } catch (error) {
    throw error;
  }
};

export const getInitialCategories = async ({ search }: SearchParams) => {
  try {
    const { categories, nextUrl } = await getAllCategories(
      limit,
      page,
      getLastValue(search)
    );

    return { categories, nextUrl };
  } catch (error) {
    throw error;
  }
};

export const getInitialFrostings = async ({ search }: SearchParams) => {
  try {
    const { frostings, nextUrl } = await getAllFrostings(
      limit,
      page,
      getLastValue(search)
    );

    return { frostings, nextUrl };
  } catch (error) {
    throw error;
  }
};

export const getInitialFillings = async ({ search }: SearchParams) => {
  try {
    const { fillings, nextUrl } = await getAllFillings(
      limit,
      page,
      getLastValue(search)
    );

    return { fillings, nextUrl };
  } catch (error) {
    throw error;
  }
};
