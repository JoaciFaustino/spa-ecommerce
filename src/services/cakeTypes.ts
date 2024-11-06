import { ICakeType } from "@/@types/CakeType";
import { api } from "./api";
import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";

type PaginatedResponse = PaginatedRequest & { cakeTypes: ICakeType[] };

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
