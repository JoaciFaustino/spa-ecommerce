import { ICake, ICakeCreateBody, ICakeUpdateBody } from "@/@types/Cake";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { CakeQueryParams } from "@/@types/QueryParams";
import axios from "axios";
import { TypeKeysSortBy } from "@/@types/SortBy";

type PaginatedResponse = BasePaginatedResponse & { cakes: ICake[] };

export const getCakeById = async (
  cakeId: string
): Promise<ICake | undefined> => {
  try {
    const session = await getSession();

    const { data } = await api.get<{ cake: ICake }>(`/cakes/${cakeId}`, {
      headers: { Authorization: session }
    });

    return data.cake;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get the cake");
  }
};

export const getFirstPageCakesCached = async (): Promise<PaginatedResponse> => {
  const page = 1;
  const limit = 12;
  const sortBy: TypeKeysSortBy = "popularity";

  const tenHours = 36000;

  try {
    const response = await fetch(
      `${api.getUri()}/cakes?page=${page}&limit=${limit}&sortBy=${sortBy}`,
      { next: { revalidate: tenHours } }
    );

    const data: PaginatedResponse = await response.json();

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};

export const getAllCakes = async ({
  type,
  size,
  category,
  filling,
  frosting,
  search,
  limit = "12",
  page = "1",
  sortBy
}: CakeQueryParams): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("/cakes", {
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
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};

export const getAllCakesCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};

export const createCake = async (
  imageFile: File,
  cake: ICakeCreateBody
): Promise<ICake> => {
  try {
    const session = await getSession();

    const formData = new FormData();
    formData.append("cake", JSON.stringify(cake));

    if (imageFile) {
      formData.append("imageCake", imageFile);
    }

    const { data } = await api.post<{ message: string; cake: ICake }>(
      `/cakes/create/`,
      formData,
      { headers: { Authorization: session } }
    );

    return data.cake;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to create the cake");
  }
};

export const updateCake = async (
  cakeId: string,
  imageFile: File | null,
  cake: ICakeUpdateBody
): Promise<ICake> => {
  try {
    const session = await getSession();

    const formData = new FormData();
    formData.append("cake", JSON.stringify(cake));

    if (imageFile) {
      formData.append("imageCake", imageFile);
    }

    const { data } = await api.patch<{ message: string; cake: ICake }>(
      `/cakes/update/${cakeId}`,
      formData,
      { headers: { Authorization: session } }
    );

    return data.cake;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to update the cake");
  }
};

export const deleteCake = async (cakeId: string): Promise<void> => {
  try {
    const session = await getSession();

    await api.delete<{ message: string }>(`/cakes/delete/${cakeId}`, {
      headers: { Authorization: session }
    });
  } catch (error: any) {
    console.log(error);

    throw getErrorRequest(error, "Ocorreu um erro");
  }
};
