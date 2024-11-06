import { ICake } from "@/@types/Cake";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest, PaginatedRequest } from "@/utils/requestUtils";
import { CakeQueryParams } from "@/@types/QueryParams";
import axios from "axios";

type PaginatedResponse = PaginatedRequest & { cakes: ICake[] };

export const getCakeById = async (
  cakeId: string
): Promise<ICake | undefined> => {
  try {
    const session = await getSession();

    const { data } = await api.get<{ cake: ICake }>(`/cakes/${cakeId}`, {
      headers: { Authorization: session }
    });

    return data.cake;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get the cake");
  }
};

export const getAllCakes = async ({
  type,
  size,
  category,
  filling,
  frosting,
  search,
  limit = "20",
  page = "1",
  sortBy
}: CakeQueryParams): Promise<PaginatedResponse> => {
  try {
    const { data } = await api.get<PaginatedResponse>("/cakes", {
      params: {
        type,
        size,
        category,
        filling,
        frosting,
        limit,
        page,
        sortBy,
        search
      },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};

export const getAllCakesCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Ocorreu um erro");
  }
};
