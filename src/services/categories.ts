import { ICategory } from "@/@types/Category";
import { getErrorRequest, BasePaginatedResponse } from "@/utils/requestUtils";
import { api } from "./api";
import { CachedRequestsRevalidateTag } from "@/@types/CachedRequestsRevalidateTags";
import { getSession } from "@/lib/session";
import { revalidateTag } from "@/actions/revalidateTags";
import axios from "axios";

type PaginatedResponse = BasePaginatedResponse & { categories: ICategory[] };

export const getAllCategoriesCompleteUrl = async (
  url: string
): Promise<PaginatedResponse> => {
  try {
    const { data } = await axios.get<PaginatedResponse>(url);

    return data;
  } catch (error: any) {
    throw getErrorRequest(error, "Failed to get categories");
  }
};

export const getAllCategories = async (
  limit?: number,
  page?: number,
  search?: string
): Promise<PaginatedResponse> => {
  const shouldGetCachedResponse = limit === 24 && page === 1 && !search;

  try {
    const revalidateTag: CachedRequestsRevalidateTag = "first-categories-page";

    if (shouldGetCachedResponse) {
      const response = await fetch(
        `${api.getUri()}/categories?page=${page}&limit=${limit}`,
        { next: { tags: [revalidateTag] } }
      );

      const data: PaginatedResponse = await response.json();
      return data;
    }

    const { data } = await api.get<PaginatedResponse>("/categories", {
      params: { limit, page, search },
      paramsSerializer: { indexes: false }
    });

    return data;
  } catch (error) {
    throw getErrorRequest(error, "Failed to get categories");
  }
};

export const createCategory = async ({
  category
}: Omit<ICategory, "_id">): Promise<ICategory> => {
  const session = await getSession();

  try {
    const { data } = await api.post<{ message: string; category: ICategory }>(
      `/categories/create`,
      { category },
      { headers: { Authorization: session } }
    );

    await revalidateTag("first-categories-page");

    return data.category;
  } catch (error) {
    throw getErrorRequest(error, "Failed to create category");
  }
};

export const updateCategory = async (
  id: string,
  { category }: Omit<ICategory, "_id">
) => {
  const session = await getSession();

  try {
    const { data } = await api.patch<{
      message: string;
      category: ICategory;
    }>(
      `/categories/update/${id}`,
      { category },
      { headers: { Authorization: session } }
    );

    await revalidateTag("first-categories-page");

    return data.category;
  } catch (error) {
    throw getErrorRequest(error, "Failed to update category");
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  const session = await getSession();

  try {
    await api.delete(`/categories/delete/${id}`, {
      headers: { Authorization: session }
    });

    await revalidateTag("first-categories-page");
  } catch (error) {
    throw getErrorRequest(error, "Failed to delete category");
  }
};
