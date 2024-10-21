"use client";
import styles from "@/styles/pages/Purchases.module.scss";
import { IOrder } from "@/@types/Order";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getAllUserOrderFullUrl } from "@/services/requests";
import { CustomError } from "@/utils/customError";
import { useEffect, useState, useTransition } from "react";
import OrderCard from "../OrderCard/OrderCard";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

type Props = {
  nextUrl: string | null;
};

function LoadNextOrders({ nextUrl }: Props) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [nextUrlState, setNextUrlState] = useState<string | null>(nextUrl);

  const [isPending, startTransition] = useTransition();

  const loadMoreDisabled = isPending || !nextUrlState;
  const { finalPageInspectorRef } = useInfiniteScroll(
    getNewOrders,
    undefined,
    loadMoreDisabled
  );

  useEffect(() => setNextUrlState(nextUrl), [nextUrl]);

  function getNewOrders() {
    if (loadMoreDisabled) {
      return;
    }

    startTransition(async () => {
      try {
        const { nextUrl, orders } = await getAllUserOrderFullUrl(nextUrlState);

        setOrders(orders);
        setNextUrlState(nextUrl);
      } catch (error) {
        if (error instanceof CustomError && error.status === 404) {
          setNextUrlState(null);
        }
      }
    });
  }

  return (
    <>
      {orders.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}

      <span className={styles.divSpinnerLoader} ref={finalPageInspectorRef}>
        {isPending && (
          <SpinnerLoader color="var(--primary-color)" size={2} unitSize="rem" />
        )}
      </span>
    </>
  );
}

export default LoadNextOrders;
