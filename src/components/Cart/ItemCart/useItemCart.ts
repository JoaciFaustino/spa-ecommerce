import { useRef, useState } from "react";
import styles from "./ItemCart.module.scss";

export const useItemCart = (
  cartId: string,
  itemCartId: string,
  removeOneItemFn: (cartId: string, itemCartId: string) => Promise<void>
) => {
  const [isPending, setIsPending] = useState(false);

  const handleRemoveItem = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      await removeOneItemFn(cartId, itemCartId);

      setIsPending(false);
    } catch (error) {
      setIsPending(false);

      return;
    }
  };

  return {
    handleRemoveItem,
    isPending
  };
};
