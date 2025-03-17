import { IFilling } from "@/@types/Filling";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import axios from "axios";
import { getSession } from "@/lib/session";
import { revalidateTag } from "@/actions/revalidateTags";

type PaginatedResponse = BasePaginatedResponse & { fillings: IFilling[] };

export const getAllFillingsCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get fillings");
  }
};

export const getAllFillings = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 24 && page === 1 && !search;

  const revalidateTag: CachedRequestsRevalidateTag = "first-fillings-page";

  if (shouldGetCachedResponse) {
    const response = await fetch(
      `${api.getUri()}/fillings?page=${page}&limit=${limit}`,
      { next: { tags: [revalidateTag] } }
    );

    const data: PaginatedResponse = await response.json();
    return data;
  }

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

export const createFilling = async ({
  name,
  price
}: Omit<IFilling, "_id">): Promise<IFilling> => {
  const session = await getSession();

  try {
    const { data } = await api.post<{ message: string; filling: IFilling }>(
      `/fillings/`,
      { name, price },
      { headers: { Authorization: session } }
    );

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-fillings-page")
    ]);

    return data.filling;
  } catch (error) {
    throw getErrorRequest(error, "Failed to create the filling");
  }
};

export const updateFilling = async (
  id: string,
  { name, price }: Partial<Omit<IFilling, "_id">>
): Promise<IFilling> => {
  const session = await getSession();

  try {
    const { data } = await api.patch<{ message: string; filling: IFilling }>(
      `/fillings/${id}`,
      { name, price },
      { headers: { Authorization: session } }
    );

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-fillings-page")
    ]);

    return data.filling;
  } catch (error) {
    throw getErrorRequest(error, "Failed to update the filling");
  }
};

export const deleteFilling = async (id: string): Promise<void> => {
  const session = await getSession();

  try {
    await api.delete(`/fillings/${id}`, {
      headers: { Authorization: session }
    });

    await Promise.all([
      revalidateTag("first-cakes-page"),
      revalidateTag("first-fillings-page")
    ]);
  } catch (error) {
    throw getErrorRequest(error, "Failed to delete the filling");
  }
};
