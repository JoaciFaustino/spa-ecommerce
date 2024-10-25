"use client";
import { IOrder, OrderState } from "@/@types/Order";
import styles from "./OrderCard.module.scss";
import OrderProductsList from "@/components/OrderProductsList/OrderProductsList";
import { formatDateTimeString } from "@/utils/formatStrings";

type OrderStateTranslate = {
  [key in OrderState]: { translate: string; color: string };
};

const orderStateTranslate: OrderStateTranslate = {
  pending: { translate: "pendente", color: "#ff0000" },
  preparing: { translate: "preparando", color: "#ffaa01" },
  done: { translate: "pronto", color: "#00ff00" }
};

function OrderCard({ order }: { order: IOrder }) {
  const dateDelivery = new Date(order.dateAndTimeDelivery || "not valid date");

  const dateDeliveryString = isNaN(dateDelivery.getTime())
    ? "indefinido"
    : formatDateTimeString(dateDelivery);

  return (
    <div className={styles.orderCard}>
      <header>
        <p className="text">
          Id do pedido <br />
          <span>{order._id}</span>
        </p>
      </header>

      <div className={styles.cardContent}>
        <OrderProductsList cakes={order.cakes} style="dark" />

        <div className={styles.orderInfo}>
          <h4>Informações do pedido</h4>

          <OrderInfoText
            label="Tipo de recebimento"
            value={order.typeOfReceipt}
          />

          <OrderInfoText
            label="Estado do pedido"
            value={orderStateTranslate[order.state].translate}
            color={orderStateTranslate[order.state].color}
          />

          <OrderInfoText label="Data de entrega" value={dateDeliveryString} />
        </div>
      </div>
    </div>
  );
}

type OrderInfoTextProps = {
  label: string;
  value: string;
  color?: string;
  loading?: boolean;
};

export const OrderInfoText = ({
  label,
  value,
  color,
  loading = false
}: OrderInfoTextProps) => (
  <p className={`text ${loading ? styles.loading : ""}`}>
    {label}: <span style={{ color }}>{value}</span>
  </p>
);

export default OrderCard;
