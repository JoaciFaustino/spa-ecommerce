import { type DeliveryAddress } from "@/@types/Order";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";

function DeliveryAddress({
  deliveryAddress: { neighborhood, number, street, adicionalInfo }
}: {
  deliveryAddress: DeliveryAddress;
}) {
  return (
    <div className={styles.infoCol}>
      <h4>Endereço de entrega</h4>

      <Text label="Rua" value={street} />
      <Text label="Número" value={number} />
      <Text label="Bairro" value={neighborhood} />
      {adicionalInfo && <Text label="Complemento" value={adicionalInfo} />}
    </div>
  );
}

export default DeliveryAddress;
