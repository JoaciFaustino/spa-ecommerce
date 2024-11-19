"use client";
import { useContext, useEffect, useState } from "react";
import OrderForm from "../OrderForm/OrderForm";
import { CartContext } from "@/contexts/CartProvider";
import styles from "@/styles/pages/Order.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";

function OrderPageClientSide({ cartId }: { cartId: string }) {
  const { cakes = [], changeCartItems } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [orderIsDone, setOrderIsDone] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    if (cakes.length === 0 && !orderIsDone) {
      router.push("/menu?sortBy=popularidade");

      toast.error("Você não pode finalizar um pedido com o carrinho vázio!");
    }
  }, [cakes]);

  const setOrderAsDone = () => {
    setOrderIsDone(true);
    changeCartItems([]);
  };

  return (
    <section className={styles.orderPage}>
      <div className={`wrapper ${styles.wrapper}`}>
        <OrderProductsList cakes={cakes} startOpened />

        <OrderForm cartId={cartId} setOrderAsDone={setOrderAsDone} />
      </div>
    </section>
  );
}

export default OrderPageClientSide;
