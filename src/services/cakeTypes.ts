import { ICakeType } from "@/@types/CakeType";
import { api } from "./api";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import axios from "axios";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import { getSession } from "@/lib/session";
import { revalidateTag } from "@/actions/revalidateTags";

type PaginatedResponse = BasePaginatedResponse & { cakeTypes: ICakeType[] };

export const getAllCakeTypesCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get cake types");
  }
};

export const getAllCakeTypes = async (
  limit: number = 24,
  page: number = 1,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 24 && page === 1 && !search;

  try {
    const revalidateTag: CachedRequestsRevalidateTag = "first-cake-types-page";

    if (shouldGetCachedResponse) {
      const response = await fetch(
        `${api.getUri()}/cakeTypes?page=${page}&limit=${limit}`,
        { next: { tags: [revalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

    const { data } = await api.get<PaginatedResponse>("/cakeTypes", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get cake types");
  }
};

export const createCakeType = async ({
  type
}: Omit<ICakeType, "_id">): Promise<ICakeType> => {
  const session = await getSession();

  try {
    const { data } = await api.post<{ message: string; cakeType: ICakeType }>(
      `/cakeTypes/create/`,
      { type },
      { headers: { Authorization: session } }
    );

    await revalidateTag("first-cake-types-page");

    return data.cakeType;
  } catch (error) {
    throw getErrorRequest(error, "Failed to create cake type");
  }
};

export const updateCakeType = async (
  id: string,
  { type }: Omit<ICakeType, "_id">
): Promise<ICakeType> => {
  const session = await getSession();

  try {
    const { data } = await api.patch<{ message: string; cakeType: ICakeType }>(
      `/cakeTypes/update/${id}`,
      { type },
      { headers: { Authorization: session } }
    );

    await revalidateTag("first-cake-types-page");

    return data.cakeType;
  } catch (error) {
    throw getErrorRequest(error, "Failed to update cake type");
  }
};

export const deleteCakeType = async (id: string): Promise<void> => {
  const session = await getSession();

  try {
    await api.delete<{ message: string }>(`/cakeTypes/delete/${id}`, {
      headers: { Authorization: session }
    });

    await revalidateTag("first-cake-types-page");

    return;
  } catch (error) {
    throw getErrorRequest(error, "Failed to delete cake types");
  }
};
