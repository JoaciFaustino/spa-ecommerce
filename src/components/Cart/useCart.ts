import { PersonalizedCake } from "@/@types/Cart";
import { removeItemCart } from "@/services/requests";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCart = (cakes: PersonalizedCake[] | undefined = []) => {
  const [allCakes, setAllCakes] = useState(cakes);
  const totalPriceCart: string = formatPriceNumber(
    allCakes.reduce((acm, { totalPricing }) => acm + totalPricing, 0)
  );


  const removeOneItem = async (cartId: string, itemCartId: string) => {
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

  return { allCakes, removeOneItem, totalPriceCart };
};
