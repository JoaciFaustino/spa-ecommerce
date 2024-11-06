import { PersonalizedCake } from "@/@types/Cart";
import { CartContext } from "@/contexts/CartProvider";
import { clearCart } from "@/services/cart";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCart = (
  newCartId: string | undefined,
  newCakes: PersonalizedCake[] | undefined = []
) => {
  const { cartId, cakes, changeCartId, changeCartItems } =
    useContext(CartContext);

  useEffect(() => changeCartId(newCartId), [newCartId]);

  useEffect(() => changeCartItems(newCakes), [newCakes]);

  const totalPriceCart: string = formatPriceNumber(
    (cakes || []).reduce(
      (acm, { totalPricing }) => acm + (totalPricing || 0),
      0
    )
  );
  const [clearCartIsPending, setClearCartIsPending] = useState(false);

  const handleClearCart = async () => {
    if (!cartId) {
      return;
    }

    try {
      setClearCartIsPending(true);
      await clearCart(cartId);

      changeCartItems([]);
    } catch (error) {
      const message = "Falha ao limpar carrinho. Tente novamente mais tarde!";

      toast.error(message);
    }

    setClearCartIsPending(false);
  };

  return {
    cakes,
    totalPriceCart,
    handleClearCart,
    clearCartIsPending
  };
};
