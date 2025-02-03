import { CakePartsContext } from "@/contexts/CakePartsProvider";
import { useContext } from "react";
import {
  getCakeTypesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling,
  getCategoriesWithErrorHandling
} from "@/utils/getCakePartsValues";

export const useCakePartsSharedOptions = () => {
  const {
    fillings: fillingsOptions,
    cakeTypes: cakeTypesOptions,
    frostings: frostingsOptions,
    categories: categoriesOptions,
    setCakeTypes,
    setCategories,
    setFillings,
    setFrostings,
    cakeTypesPage,
    categoriesPage,
    fillingsPage,
    frostingsPage,
    setCakeTypesPage,
    setCategoriesPage,
    setFillingsPage,
    setFrostingsPage
  } = useContext(CakePartsContext);

  const getMoreCakeTypesOptions = async (page: number, limit: number) => {
    const res = await getCakeTypesWithErrorHandling(limit, page);

    const cakeTypes = res.map(({ type }) => type);

    if (cakeTypes.length > 0) {
      setCakeTypesPage(page + 1);
      setCakeTypes((prev) => [...prev, ...cakeTypes]);
    }

    return cakeTypes;
  };

  const getMoreFrostingOptions = async (page: number, limit: number) => {
    const res = await getFrostingsWithErrorHandling(limit, page);

    const frostings = res.map(({ name }) => name);

    if (frostings.length > 0) {
      setFrostingsPage(page + 1);
      setFrostings((prev) => [...prev, ...frostings]);
    }

    return frostings;
  };

  const getMoreFillingOptions = async (page: number, limit: number) => {
    const res = await getFillingsWithErrorHandling(limit, page);

    const fillings = res.map(({ name }) => name);

    if (fillings.length > 0) {
      setFillingsPage(page + 1);
      setFillings((prev) => [...prev, ...fillings]);
    }

    return fillings;
  };

  const getMoreCategoriesOptions = async (page: number, limit: number) => {
    const res = await getCategoriesWithErrorHandling(limit, page);

    const categories = res.map(({ category }) => category);

    if (categories.length > 0) {
      setCategoriesPage(page + 1);
      setCategories((prev) => [...prev, ...categories]);
    }

    return categories;
  };

  return {
    cakeTypesOptions,
    fillingsOptions,
    frostingsOptions,
    categoriesOptions,
    cakeTypesPage,
    categoriesPage,
    fillingsPage,
    frostingsPage,
    getMoreCakeTypesOptions,
    getMoreFrostingOptions,
    getMoreFillingOptions,
    getMoreCategoriesOptions
  };
};
