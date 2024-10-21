"use client";
import styles from "./Products.module.scss";
import ItemCart from "@/components/Cart/ItemCart/ItemCart";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { formatPriceNumber } from "@/utils/formatPrice";
import { CartContext } from "@/contexts/CartProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";

function Products() {
  const { cakes = [] } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    if (cakes.length === 0) {
      router.push("/menu?sortBy=popularidade");

      toast.error("Você não pode finalizar um pedido com o carrinho vázio!");
    }
  }, [cakes]);

  return <OrderProductsList cakes={cakes} startOpened />;
}

export default Products;
