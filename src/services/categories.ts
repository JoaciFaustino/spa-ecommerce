import { ICategory } from "@/@types/Category";
import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";
import { api } from "./api";

type PaginatedResponse = PaginatedRequest & { categories: ICategory[] };

export const getAllCategories = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("/categories", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get categories");
  }
};
