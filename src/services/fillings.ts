import { IFilling } from "@/@types/Filling";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";

type PaginatedResponse = BasePaginatedResponse & { fillings: IFilling[] };

export const getFirstPageFillingsCached =
  async (): Promise<PaginatedResponse> => {
    const page = 1;
    const limit = 12;
    const tenHours = 36000;

    try {
      const response = await fetch(
        `${api.getUri()}/fillings?page=${page}&limit=${limit}`,
        { next: { revalidate: tenHours } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    } catch (error: any) {
      throw getErrorRequest(error, "Failed to get the fillings");
    }
  };

export const getAllFillings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
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
