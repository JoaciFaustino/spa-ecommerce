import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { IFrosting } from "@/@types/Frosting";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import axios from "axios";
import { getSession } from "@/lib/session";
import { revalidateTag } from "@/actions/revalidateTags";

type PaginatedResponse = BasePaginatedResponse & { frostings: IFrosting[] };

export const getAllFrostingsCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get frostings");
  }
};

export const getAllFrostings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 24 && page === 1 && !search;

  const revalidateTag: CachedRequestsRevalidateTag = "first-frostings-page";

  try {
    if (shouldGetCachedResponse) {
      const response = await fetch(
        `${api.getUri()}/frostings?page=${page}&limit=${limit}`,
        { next: { tags: [revalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

    const { data } = await api.get<PaginatedResponse>("/frostings", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get the frostings");
  }
};

export const createFrosting = async ({
  name,
  price
}: Omit<IFrosting, "_id">): Promise<IFrosting> => {
  const session = await getSession();

  try {
    const { data } = await api.post<{ message: string; frosting: IFrosting }>(
      `/frostings/`,
      { name, price },
      { headers: { Authorization: session } }
    );

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-frostings-page")
    ]);

    return data.frosting;
  } catch (error) {
    throw getErrorRequest(error, "Failed to create the frosting");
  }
};

export const updateFrosting = async (
  id: string,
  { name, price }: Partial<Omit<IFrosting, "_id">>
): Promise<IFrosting> => {
  const session = await getSession();

  try {
    const { data } = await api.patch<{ message: string; frosting: IFrosting }>(
      `/frostings/${id}`,
      { name, price },
      { headers: { Authorization: session } }
    );

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-frostings-page")
    ]);

    return data.frosting;
  } catch (error) {
    throw getErrorRequest(error, "Failed to update the frosting");
  }
};

export const deleteFrosting = async (id: string): Promise<void> => {
  const session = await getSession();

  try {
    await api.delete(`/frostings/${id}`, {
      headers: { Authorization: session }
    });

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-frostings-page")
    ]);
  } catch (error) {
    throw getErrorRequest(error, "Failed to delete the frosting");
  }
};
