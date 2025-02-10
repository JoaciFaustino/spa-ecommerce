import { ICake, ICakeCreateBody, ICakeUpdateBody } from "@/@types/Cake";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { CakeQueryParams } from "@/@types/QueryParams";
import axios from "axios";
import {
  SortBy,
  SortByApiOptionsTranslate,
  sortByApiOptionsTranslate
} from "@/@types/SortBy";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import { revalidateTag } from "@/actions/revalidateTags";
import { getLastValue } from "@/utils/queryParams";

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

export const getAllCakes = async ({
  type,
  size,
  category,
  filling,
  frosting,
  search,
  limit = "12",
  page = "1",
  sortBy = "popularidade"
}: CakeQueryParams): Promise<PaginatedResponse> => {
  const sortByLastValue = getLastValue(sortBy) || "popularidade";

  const sortByApiOption: SortBy =
    sortByApiOptionsTranslate[sortByLastValue as SortByApiOptionsTranslate] ??
    "popularity";

  const shouldGetCachedCakes: boolean =
    sortByApiOption === "popularity" &&
    limit === "12" &&
    page === "1" &&
    (!category || category.length === 0) &&
    (!filling || filling.length === 0) &&
    (!frosting || frosting.length === 0) &&
    (!search || search.length === 0) &&
    (!size || size.length === 0) &&
    (!type || type.length === 0);

  try {
    if (shouldGetCachedCakes) {
      const cakeRevalidateTag: CachedRequestsRevalidateTag = "first-cakes-page";

      const response = await fetch(
        `${api.getUri()}/cakes?page=${page}&limit=${limit}&sortBy=${sortBy}`,
        { next: { tags: [cakeRevalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

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

    await revalidateTag("first-cakes-page");

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

    await revalidateTag("first-cakes-page");

    return data.cake;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to update the cake");
  }
};

export const deleteCake = async (cakeId: string): Promise<void> => {
  const session = await getSession();

  try {
    await api.delete<{ message: string }>(`/cakes/delete/${cakeId}`, {
      headers: { Authorization: session }
    });

    await revalidateTag("first-cakes-page");
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};
