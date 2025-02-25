import { type ContactDetails } from "@/@types/Order";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";

type Props = {
  contactDetails: ContactDetails;
  isSkeleton?: boolean;
};

function ContactDetails({
  contactDetails: { email, name, phoneNumber },
  isSkeleton = false
}: Props) {
  return (
    <div className={styles.infoCol}>
      <h4>Detalhes de contato</h4>

      <Text label="Nome" value={name} loading={isSkeleton} />
      <Text label="Email" value={email} loading={isSkeleton} />
      <Text
        label="Número de telefone"
        value={phoneNumber}
        loading={isSkeleton}
      />
    </div>
  );
}

export default ContactDetails;
