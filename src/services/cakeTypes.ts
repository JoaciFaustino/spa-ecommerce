import { ICakeType } from "@/@types/CakeType";
import { api } from "./api";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";

type PaginatedResponse = BasePaginatedResponse & { cakeTypes: ICakeType[] };

export const getFirstPageCakeTypesCached =
  async (): Promise<PaginatedResponse> => {
    const page = 1;
    const limit = 12;
    const tenHours = 36000;

    try {
      const response = await fetch(
        `${api.getUri()}/cakeTypes?page=${page}&limit=${limit}`,
        { next: { revalidate: tenHours } }
      );

      const data: PaginatedResponse = await response.json();

      return data;
    } catch (error: any) {
      throw getErrorRequest(error, "Failed to get cake types");
    }
  };

export const getAllCakeTypes = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("/cakeTypes", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get cake types");
  }
};
