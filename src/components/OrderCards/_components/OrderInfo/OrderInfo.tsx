import { IOrder, OrderState } from "@/@types/Order";
import { formatDateTimeString } from "@/utils/formatStrings";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";

type OrderStateTranslate = {
  [key in OrderState]: { translate: string; color: string };
};

const orderStateTranslate: OrderStateTranslate = {
  pending: { translate: "pendente", color: "#ff0000" },
  preparing: { translate: "preparando", color: "#ffaa01" },
  done: { translate: "pronto", color: "#00ff00" }
};

function OrderInfo({
  order: { typeOfReceipt, dateAndTimeDelivery, state }
}: {
  order: IOrder;
}) {
  const dateDelivery = new Date(dateAndTimeDelivery || "not valid date");

  const dateDeliveryString = isNaN(dateDelivery.getTime())
    ? "indefinido"
    : formatDateTimeString(dateDelivery);

  return (
    <div className={styles.infoCol}>
      <h4>Informações do pedido</h4>

      <Text label="Tipo de recebimento" value={typeOfReceipt} />
      <Text
        label="Estado do pedido"
        value={orderStateTranslate[state].translate}
        color={orderStateTranslate[state].color}
      />
      <Text label="Data de entrega" value={dateDeliveryString} />
    </div>
  );
}

export default OrderInfo;
