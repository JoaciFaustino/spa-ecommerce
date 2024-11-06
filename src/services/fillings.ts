import { IFilling } from "@/@types/Filling";
import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";
import { api } from "./api";

type PaginatedResponse = PaginatedRequest & { fillings: IFilling[] };

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
