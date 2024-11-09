import { ICakeType } from "@/@types/CakeType";
import { ICategory } from "@/@types/Category";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import {
  getAllCakeTypes,
  getFirstPageCakeTypesCached
} from "@/services/cakeTypes";
import {
  getAllCategories,
  getFirstPageCategoriesCached
} from "@/services/categories";
import {
  getAllFillings,
  getFirstPageFillingsCached
} from "@/services/fillings";
import {
  getAllFrostings,
  getFirstPageFrostingsCached
} from "@/services/frostings";

export const getCakeTypesWithErrorHandling = async (
  limit: number,
  page: number,
  search?: string
): Promise<ICakeType[]> => {
  try {
    if (page === 1 && limit === 12 && !search) {
      const { cakeTypes } = await getFirstPageCakeTypesCached();

      return cakeTypes;
    }

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
    if (page === 1 && limit === 12 && !search) {
      const { categories } = await getFirstPageCategoriesCached();

      return categories;
    }

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
    if (page === 1 && limit === 12 && !search) {
      const { fillings } = await getFirstPageFillingsCached();

      return fillings;
    }

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
    if (page === 1 && limit === 12 && !search) {
      const { frostings } = await getFirstPageFrostingsCached();

      return frostings;
    }

    const { frostings } = await getAllFrostings(limit, page, search);

    return frostings;
  } catch (error) {
    return [];
  }
};
