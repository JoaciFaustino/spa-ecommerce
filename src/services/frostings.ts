import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";
import { api } from "./api";
import { IFrosting } from "@/@types/Frosting";

type PaginatedResponse = PaginatedRequest & { frostings: IFrosting[] };

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
