import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { IFrosting } from "@/@types/Frosting";

type PaginatedResponse = BasePaginatedResponse & { frostings: IFrosting[] };

export const getFirstPageFrostingsCached =
  async (): Promise<PaginatedResponse> => {
    const page = 1;
    const limit = 12;
    const tenHours = 36000;

    try {
      const response = await fetch(
        `${api.getUri()}/frostings?page=${page}&limit=${limit}`,
        { next: { revalidate: tenHours } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    } catch (error) {
      throw getErrorRequest(error, "Failed to get the frostings");
    }
  };

export const getAllFrostings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("/frostings", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get the frostings");
  }
};
