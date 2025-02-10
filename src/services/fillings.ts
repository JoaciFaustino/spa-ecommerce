import { IFilling } from "@/@types/Filling";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";

type PaginatedResponse = BasePaginatedResponse & { fillings: IFilling[] };

export const getAllFillings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 12 && page === 1 && !search;

  const revalidateTag: CachedRequestsRevalidateTag = "first-fillings-page";

  if (shouldGetCachedResponse) {
    const response = await fetch(
      `${api.getUri()}/fillings?page=${page}&limit=${limit}`,
      { next: { tags: [revalidateTag] } }
    );

    const data: PaginatedResponse = await response.json();
    return data;
  }

  try {
    const { data } = await api.get<PaginatedResponse>("/fillings", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get the fillings");
  }
};
