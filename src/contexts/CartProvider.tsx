"use client";
import { PersonalizedCake } from "@/@types/Cart";
import { createContext, useState } from "react";

type CartContext = {
  cartId?: string;
  cakes?: PersonalizedCake[];
  changeCartId: (newCartId: string | undefined) => void;
  changeCartItems: (cartItems: PersonalizedCake[]) => void;
  addItemToCart: (newItem: PersonalizedCake) => void;
  removeItemToCart: (itemId: string) => void;
};

export const CartContext = createContext({} as CartContext);

type CartProviderProps = {
  children: React.ReactNode;
};

function CartProvider({ children }: CartProviderProps) {
  const [cakes, setCakes] = useState<PersonalizedCake[]>([]);
  const [cartId, setCartId] = useState<string | undefined>();

  const changeCartId = (newCartId: string | undefined) => setCartId(newCartId);

  const changeCartItems = (cartItems: PersonalizedCake[]) =>
    setCakes(cartItems);

  const addItemToCart = (newItem: PersonalizedCake) =>
    setCakes((prev) => [...prev, newItem]);

  const removeItemToCart = (itemId: string) =>
    setCakes((prev) => prev.filter(({ _id }) => _id !== itemId));

  return (
    <CartContext.Provider
      value={{
        cartId,
        cakes,
        changeCartId,
        changeCartItems,
        addItemToCart,
        removeItemToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
