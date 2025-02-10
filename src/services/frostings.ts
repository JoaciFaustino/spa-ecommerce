import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { IFrosting } from "@/@types/Frosting";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";

type PaginatedResponse = BasePaginatedResponse & { frostings: IFrosting[] };

export const getAllFrostings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 12 && page === 1 && !search;

  const revalidateTag: CachedRequestsRevalidateTag = "first-frostings-page";

  try {
    if (shouldGetCachedResponse) {
      const response = await fetch(
        `${api.getUri()}/frostings?page=${page}&limit=${limit}`,
        { next: { tags: [revalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

    const { data } = await api.get<PaginatedResponse>("/frostings", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get the frostings");
  }
};
