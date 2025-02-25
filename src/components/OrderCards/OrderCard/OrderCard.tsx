"use client";
import { IOrder } from "@/@types/Order";
import styles from "../OrderCard.module.scss";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";
import OrderHeader from "../_components/OrderHeader/OrderHeader";
import OrderInfo from "../_components/OrderInfo/OrderInfo";
import { useState } from "react";
import { normalizeDate } from "@/utils/dateUtils";

type Props = {
  order: IOrder;
};

function OrderCard({
  order: { _id, cakes, state, typeOfReceipt, dateAndTimeDelivery, createdAt }
}: Props) {
  const [dateCreatedAt] = useState(() => normalizeDate(createdAt) || undefined);
  const [dateDelivery] = useState(
    () => normalizeDate(dateAndTimeDelivery) || undefined
  );

  return (
    <div className={styles.orderCard}>
      <OrderHeader orderId={_id} />

      <div className={styles.cardContent}>
        <OrderProductsList cakes={cakes} style="dark" />

        <OrderInfo
          createdAt={dateCreatedAt}
          state={state}
          typeOfReceipt={typeOfReceipt}
          dateAndTimeDelivery={dateDelivery}
        />
      </div>
    </div>
  );
}

export default OrderCard;
