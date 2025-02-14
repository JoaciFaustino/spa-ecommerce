"use client";
import styles from "@/styles/pages/Purchases.module.scss";
import { IOrder } from "@/@types/Order";
import { getAllUserOrdersFullUrl } from "@/services/order";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import OrderCard from "@/components/OrderCards/OrderCard/OrderCard";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";

type Props = {
  nextUrl: string | null;
};

function LoadNextOrders({ nextUrl }: Props) {
  const {
    itens: orders,
    isPending,
    finalPageInspectorRef
  } = useNextItensPaginateds<IOrder, "orders">(
    nextUrl || undefined,
    "orders",
    getAllUserOrdersFullUrl
  );

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
