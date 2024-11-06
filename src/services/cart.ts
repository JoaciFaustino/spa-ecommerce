import { Size } from "@/@types/Cake";
import { PersonalizedCake } from "@/@types/Cart";
import { getSession } from "@/lib/session";
import { api } from "./api";
import { getErrorRequest } from "@/utils/requestUtils";

export const addItemToCart = async (
  cartId: string,
  cakeId: string,
  quantity: number,
  type?: string,
  frosting?: string,
  fillings?: string[],
  size?: Size
): Promise<PersonalizedCake> => {
  try {
    const session = await getSession();

    const { data } = await api.patch<{ addedCake: PersonalizedCake }>(
      `/cart/add-cake/${cartId}`,
      {
        cartId,
        cakeId,
        type,
        frosting,
        fillings,
        size,
        quantity
      },
      { headers: { Authorization: session } }
    );

    return data.addedCake;
  } catch (error) {
    throw getErrorRequest(error, "failed to add item in cart");
  }
};

export const removeItemCart = async (
  cartId: string,
  itemCartId: string
): Promise<void> => {
  try {
    const session = await getSession();

    await api.patch<{ message: string }>(
      `/cart/remove-cake/${cartId}/${itemCartId}`,
      {},
      { headers: { Authorization: session } }
    );
  } catch (error: any) {
    throw getErrorRequest(error, "failed to remove item in cart");
  }
};

export const clearCart = async (cartId: string) => {
  try {
    const session = await getSession();

    await api.patch<{ message: string }>(
      `/cart/clear/${cartId}`,
      {},
      { headers: { Authorization: session } }
    );
  } catch (error: any) {
    throw getErrorRequest(error, "failed to clear cart");
  }
};
