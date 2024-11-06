import { getAllCakeTypes } from "@/services/CakeTypes";
import { getAllCategories } from "@/services/categories";
import { getAllFillings } from "@/services/fillings";
import { getAllFrostings } from "@/services/frostings";

export const getCakeTypesWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
) => {
  try {
    const { cakeTypes } = await getAllCakeTypes(limit, page, search);

    return cakeTypes;
  } catch (error) {
    return [];
  }
};

export const getCategoriesWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
) => {
  try {
    const { categories } = await getAllCategories(limit, page, search);

    return categories;
  } catch (error) {
    return [];
  }
};

export const getFillingsWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
) => {
  try {
    const { fillings } = await getAllFillings(limit, page, search);

    return fillings;
  } catch (error) {
    return [];
  }
};

export const getFrostingsWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
) => {
  try {
    const { frostings } = await getAllFrostings(limit, page, search);

    return frostings;
  } catch (error) {
    return [];
  }
};
