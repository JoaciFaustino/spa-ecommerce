"use client";
import { IOrder } from "@/@types/Order";
import styles from "../OrderCard.module.scss";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";
import OrderHeader from "../_components/OrderHeader/OrderHeader";
import OrderInfo from "../_components/OrderInfo/OrderInfo";

function OrderCard({ order }: { order: IOrder }) {
  return (
    <div className={styles.orderCard}>
      <OrderHeader orderId={order._id} />

      <div className={styles.cardContent}>
        <OrderProductsList cakes={order.cakes} style="dark" />

        <OrderInfo order={order} />
      </div>
    </div>
  );
}

export default OrderCard;
