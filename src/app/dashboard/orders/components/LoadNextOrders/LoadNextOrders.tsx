"use client";
import styles from "./LoadNextOrders.module.scss";
import { IOrder } from "@/@types/Order";
import { getAllOrdersFullUrl } from "@/services/order";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import { useNextItensPaginateds } from "@/hooks/useNextItensPaginateds";
import AdminOrderCard from "@/components/OrderCards/AdminOrderCard/AdminOrderCard";

type Props = {
  firstOrders: IOrder[];
  nextUrl: string | null;
};

function LoadNextOrders({ firstOrders, nextUrl }: Props) {
  const {
    itens: orders,
    isPending,
    updateItem: updateOneOrderListItem,
    deleteItem: deleteOneOrderListItem,
    finalPageInspectorRef
  } = useNextItensPaginateds<IOrder, "orders">(
    nextUrl || undefined,
    "orders",
    getAllOrdersFullUrl,
    firstOrders
  );

  const updateOrderItem = (id: string, newOrder: IOrder) =>
    updateOneOrderListItem("_id", id, newOrder);

  const deleteOrderItem = (id: string) => deleteOneOrderListItem("_id", id);

  return (
    <>
      {orders.map((order) => (
        <AdminOrderCard
          order={order}
          key={order._id}
          updateOrderItem={updateOrderItem}
          deleteOrderItem={deleteOrderItem}
        />
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
