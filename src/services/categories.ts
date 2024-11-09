import { ICategory } from "@/@types/Category";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";

type PaginatedResponse = BasePaginatedResponse & { categories: ICategory[] };

export const getFirstPageCategoriesCached =
  async (): Promise<PaginatedResponse> => {
    const page = 1;
    const limit = 12;
    const tenHours = 36000;

    try {
      const response = await fetch(
        `${api.getUri()}/categories?page=${page}&limit=${limit}`,
        { next: { revalidate: tenHours } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    } catch (error) {
      throw getErrorRequest(error, "Failed to get categories");
    }
  };

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
