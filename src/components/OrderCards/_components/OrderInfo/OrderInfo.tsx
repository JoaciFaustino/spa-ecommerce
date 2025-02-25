"use client";
import { OrderState, TypeOfReceipt } from "@/@types/Order";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";
import { useState } from "react";
import {
  getDateString,
  normalizeDate,
  verifyDeliveryIsLate
} from "@/utils/dateUtils";

type StateTranslate = {
  [key in OrderState]: { translate: string; color: string };
};

const stateTranslate: StateTranslate = {
  pending: { translate: "pendente", color: "#ff0000" },
  preparing: { translate: "preparando", color: "#ffaa01" },
  done: { translate: "pronto", color: "#00ff00" }
};

type Props = {
  typeOfReceipt: TypeOfReceipt;
  dateAndTimeDelivery?: Date;
  createdAt?: Date;
  state: OrderState;
  isSkeleton?: boolean; //tem que fazer o skeleton disso pra não ter que carregar toda essa logica em um skeleton
};

function OrderInfo({
  typeOfReceipt,
  dateAndTimeDelivery,
  state,
  createdAt,
  isSkeleton = false
}: Props) {
  const deliveryIsLate = verifyDeliveryIsLate(dateAndTimeDelivery || null);
  const createdAtString = createdAt ? getDateString(createdAt) : "indefinido";
  const deliveryString = dateAndTimeDelivery
    ? getDateString(dateAndTimeDelivery)
    : "não definida";

  return (
    <div className={styles.infoCol}>
      <h4>Informações do pedido</h4>

      <Text
        label="Data do pedido"
        value={createdAtString}
        loading={isSkeleton}
      />

      <Text
        label="Tipo de recebimento"
        value={typeOfReceipt}
        loading={isSkeleton}
      />

      <Text
        label="Estado do pedido"
        value={stateTranslate[state].translate}
        color={stateTranslate[state].color}
        loading={isSkeleton}
      />

      {typeOfReceipt === "delivery" && (
        <Text
          label="Data de entrega"
          value={`${deliveryString} ${
            deliveryIsLate
              ? "(entrega atrasada ou não marcada como entregue)"
              : ""
          }`}
          loading={isSkeleton}
        />
      )}
    </div>
  );
}

export default OrderInfo;
