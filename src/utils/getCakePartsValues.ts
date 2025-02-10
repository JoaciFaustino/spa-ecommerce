import { ICakeType } from "@/@types/CakeType";
import { ICategory } from "@/@types/Category";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { getAllCakeTypes } from "@/services/cakeTypes";
import { getAllCategories } from "@/services/categories";
import { getAllFillings } from "@/services/fillings";
import { getAllFrostings } from "@/services/frostings";

export const getCakeTypesWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
): Promise<ICakeType[]> => {
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
): Promise<ICategory[]> => {
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
): Promise<IFilling[]> => {
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
): Promise<IFrosting[]> => {
  try {
    const { frostings } = await getAllFrostings(limit, page, search);

    return frostings;
  } catch (error) {
    return [];
  }
};
