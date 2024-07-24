import { ICakeType } from "@/@types/CakeType";
import { ICake } from "../@types/Cake";
import { api } from "./api";
import { ICategory } from "@/@types/Category";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { CakeQueryParams } from "@/@types/QueryParams";
import axios from "axios";

type SucessGetAllCakes = {
  sucess: true;
  maxPages: number;
  cakes: ICake[];
  prevUrl: null | string;
  nextUrl: null | string;
};

type failedGetAllCakes = {
  sucess: false;
  message: string;
  status: number;
  maxPages: 0;
};

export const getAllCakes = async ({
  type,
  size,
  category,
  filling,
  frosting,
  search,
  limit = "20",
  page = "1",
  sortBy
}: CakeQueryParams): Promise<SucessGetAllCakes | failedGetAllCakes> => {
  try {
    const { data } = await api.get<{
      maxPages: number;
      cakes: ICake[];
      prevUrl: null | string;
      nextUrl: null | string;
    }>("/cakes", {
      params: {
        type,
        size,
        category,
        filling,
        frosting,
        limit,
        page,
        sortBy,
        search
      },
      paramsSerializer: {
        indexes: false
      }
    });

    return { sucess: true, ...data };
  } catch (error: any) {
    const errorObject: failedGetAllCakes = {
      sucess: false,
      message: "Ocorreu um erro",
      status: 500,
      maxPages: 0
    };

    if (!axios.isAxiosError(error)) {
      return errorObject;
    }

    const status = error?.response?.status;

    switch (status) {
      case 404:
        return {
          ...errorObject,
          message: "essa página não existe",
          status: 404
        };

      case 500:
        return {
          ...errorObject,
          message: "erro no servidor, por favor tente novamente mais tarde"
        };

      default:
        return errorObject;
    }
  }
};

export const getAllCakesCompleteUrl = async (
  url: string
): Promise<SucessGetAllCakes | failedGetAllCakes> => {
  try {
    const { data } = await axios.get<{
      maxPages: number;
      cakes: ICake[];
      prevUrl: null | string;
      nextUrl: null | string;
    }>(url);

    return { sucess: true, ...data };
  } catch (error: any) {
    const { status } = error.response;
    const maxPages = 0;
    const sucess = false;

    switch (status) {
      case 404:
        return {
          sucess,
          message: "essa página não existe",
          status,
          maxPages
        };

      case 500:
        return {
          sucess,
          message: "erro no servidor, por favor tente novamente mais tarde",
          status,
          maxPages
        };

      default:
        return { sucess, message: "Ocorreu um erro", status, maxPages };
    }
  }
};

//trocar isso depois e usar o getAllCakes com os filtros
export const getCakeBestSellers = async (): Promise<ICake[] | undefined> => {
  try {
    const limit = 12;
    const page = 1;
    const sortBy = "popularity";

    const { data } = await api.get<{
      maxPages: number;
      cakes: ICake[];
      prevUrl: null | string;
      nextUrl: null | string;
    }>(`/cakes?page=${page}&limit=${limit}&sortBy=${sortBy}`);

    return data.cakes;
  } catch (error: any) {
    return;
  }
};

export const getAllCakeTypes = async (): Promise<ICakeType[] | undefined> => {
  try {
    const { data } = await api.get<{ cakeTypes: ICakeType[] }>("/cakeTypes");

    return data.cakeTypes;
  } catch (error: any) {
    return;
  }
};

export const getAllCategories = async (): Promise<ICategory[] | undefined> => {
  try {
    const { data } = await api.get<{ categories: ICategory[] }>("/categories");

    return data.categories;
  } catch (error: any) {
    return;
  }
};

export const getAllFillings = async (): Promise<IFilling[] | undefined> => {
  try {
    const { data } = await api.get<{ fillings: IFilling[] }>("/fillings");

    return data.fillings;
  } catch (error: any) {
    return;
  }
};

export const getAllFrostings = async (): Promise<IFrosting[] | undefined> => {
  try {
    const { data } = await api.get<{ frostings: IFrosting[] | undefined }>(
      "/frostings"
    );

    return data.frostings;
  } catch (error: any) {
    return;
  }
};
