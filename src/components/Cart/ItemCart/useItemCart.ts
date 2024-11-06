import { CartContext } from "@/contexts/CartProvider";
import { removeItemCart } from "@/services/cart";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export const useItemCart = (itemCartId: string) => {
  const [isPending, setIsPending] = useState(false);
  const { cartId, removeItemToCart } = useContext(CartContext);

  const handleRemoveItem = async () => {
    if (isPending || !cartId) {
      return;
    }

    setIsPending(true);

    try {
      await removeItemCart(cartId, itemCartId);

      removeItemToCart(itemCartId);
    } catch (error: any) {
      toast.error(
        "Falha ao remover item do carrinho. Tente novamente mais tarde!"
      );
    }

    setIsPending(false);
  };

  return { handleRemoveItem, isPending };
};
