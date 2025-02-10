import { ICategory } from "@/@types/Category";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";

type PaginatedResponse = BasePaginatedResponse & { categories: ICategory[] };

export const getAllCategories = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 12 && page === 1 && !search;

  try {
    const revalidateTag: CachedRequestsRevalidateTag = "first-categories-page";

    if (shouldGetCachedResponse) {
      const response = await fetch(
        `${api.getUri()}/categories?page=${page}&limit=${limit}`,
        { next: { tags: [revalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

    const { data } = await api.get<PaginatedResponse>("/categories", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get categories");
  }
};
