import { ICakeType } from "@/@types/CakeType";
import { ICake, Size } from "../@types/Cake";
import { api } from "./api";
import { ICategory } from "@/@types/Category";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { CakeQueryParams } from "@/@types/QueryParams";
import axios from "axios";
import { getSession } from "@/lib/session";
import { CustomError } from "@/utils/customError";
import { PersonalizedCake } from "@/@types/Cart";

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

export const getCakeById = async (cakeId: string): Promise<ICake> => {
  try {
    const session = await getSession();

    const { data } = await api.get<{ cake: ICake }>(`/cakes/${cakeId}`, {
      headers: { Authorization: session }
    });

    return data.cake;
  } catch (error: any) {
    if (!axios.isAxiosError(error)) {
      throw new CustomError("ocorreu um erro!", 500);
    }

    const status = error?.response?.status;

    if (status === 401) {
      throw new CustomError("Você não está autenticado", 401);
    }

    if (status === 404) {
      throw new CustomError("Bolo não encontrado", 404);
    }

    if (status === 500) {
      throw new CustomError("Ocorreu um erro no servidor", 500);
    }

    throw new CustomError("ocorreu um erro!", 500);
  }
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

export const addItemToCart = async (
  cartId: string,
  cakeId: string,
  quantity: number,
  type?: string,
  frosting?: string,
  fillings?: string[],
  size?: Size
): Promise<PersonalizedCake> => {
  try {
    const session = await getSession();

    const { data } = await api.patch<{ addedCake: PersonalizedCake }>(
      `/cart/add-cake/${cartId}`,
      {
        cartId,
        cakeId,
        type,
        frosting,
        fillings,
        size,
        quantity
      },
      { headers: { Authorization: session } }
    );

    return data.addedCake;
  } catch (error) {
    throw new Error("Ocorreu um erro ao tentar adicionar o item no carrinho!");
  }
};

export const removeItemCart = async (
  cartId: string,
  itemCartId: string
): Promise<void> => {
  try {
    const session = await getSession();

    await api.patch<{ message: string }>(
      `/cart/remove-cake/${cartId}/${itemCartId}`,
      {},
      { headers: { Authorization: session } }
    );
  } catch (error: any) {
    throw new Error("Ocorreu um erro ao tentar remover o item do carrinho!");
  }
};

export const clearCart = async (cartId: string) => {
  try {
    const session = await getSession();

    await api.patch<{ message: string }>(
      `/cart/clear/${cartId}`,
      {},
      { headers: { Authorization: session } }
    );
  } catch (error: any) {
    throw new Error("Ocorreu um erro ao limpar o carrinho!");
  }
};
