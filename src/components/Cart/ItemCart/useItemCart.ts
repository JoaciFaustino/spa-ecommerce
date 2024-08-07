import { useRef, useState } from "react";

export const useItemCart = (
  itemCartId: string,
  removeOneItemFn: (itemCartId: string) => Promise<void>
) => {
  const [isPending, setIsPending] = useState(false);

  const handleRemoveItem = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      await removeOneItemFn(itemCartId);

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
