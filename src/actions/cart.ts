"use server";
import { Cart } from "@/@types/Cart";
import { getSession } from "@/lib/session";
import { api } from "@/services/api";

export const getCartById = async (id: string): Promise<Cart | undefined> => {
  try {
    const session = await getSession();

    if (!session) {
      return;
    }

    const { data } = await api.get<{ cart: Cart }>(`/cart/${id}`, {
      headers: { Authorization: session }
    });

    return data.cart;
  } catch (error) {
    return;
  }
};
