import { type DeliveryAddress } from "@/@types/Order";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";

type Props = {
  deliveryAddress: DeliveryAddress;
  isSkeleton?: boolean;
};

function DeliveryAddress({
  deliveryAddress: { neighborhood, number, street, adicionalInfo },
  isSkeleton = false
}: Props) {
  return (
    <div className={styles.infoCol}>
      <h4>Endereço de entrega</h4>

      <Text label="Rua" value={street} loading={isSkeleton} />
      <Text label="Número" value={number} loading={isSkeleton} />
      <Text label="Bairro" value={neighborhood} loading={isSkeleton} />
      {adicionalInfo && (
        <Text label="Complemento" value={adicionalInfo} loading={isSkeleton} />
      )}
    </div>
  );
}

export default DeliveryAddress;
