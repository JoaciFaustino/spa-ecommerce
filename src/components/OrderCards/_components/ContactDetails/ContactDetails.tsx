import { type ContactDetails } from "@/@types/Order";
import styles from "../../OrderCard.module.scss";
import Text from "../Text/Text";

function ContactDetails({
  contactDetails: { email, name, phoneNumber }
}: {
  contactDetails: ContactDetails;
}) {
  return (
    <div className={styles.infoCol}>
      <h4>Detalhes de contato</h4>

      <Text label="Nome" value={name} />
      <Text label="Email" value={email} />
      <Text label="Número de telefone" value={phoneNumber} />
    </div>
  );
}

export default ContactDetails;
