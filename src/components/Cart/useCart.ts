import { PersonalizedCake } from "@/@types/Cart";
import { clearCart, removeItemCart } from "@/services/requests";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCart = (
  cartId: string | undefined,
  cakes: PersonalizedCake[] | undefined = []
) => {
  const [allCakes, setAllCakes] = useState(cakes);
  const totalPriceCart: string = formatPriceNumber(
    allCakes.reduce((acm, { totalPricing }) => acm + totalPricing, 0)
  );
  const [clearCartIsPending, setClearCartIsPending] = useState(false);

  const removeOneItem = async (itemCartId: string) => {
    if (!cartId) {
      return;
    }

    try {
      await removeItemCart(cartId, itemCartId);

      setAllCakes((prev) => prev.filter((cake) => cake._id !== itemCartId));
    } catch (error: any) {
      const message =
        "Falha ao remover item do carrinho. Tente novamente mais tarde!";

      toast.error(message);

      throw new Error(message);
    }
  };

  const handleClearCart = async () => {
    if (!cartId) {
      return;
    }

    try {
      setClearCartIsPending(true);
      await clearCart(cartId);

      setAllCakes([]);
      setClearCartIsPending(false);
    } catch (error) {
      const message = "Falha ao limpar carrinho. Tente novamente mais tarde!";

      toast.error(message);
      setClearCartIsPending(false);

      throw new Error(message);
    }
  };

  return {
    allCakes,
    removeOneItem,
    totalPriceCart,
    handleClearCart,
    clearCartIsPending
  };
};
