import { RiErrorWarningLine } from "react-icons/ri";
import styles from "./Note.module.scss";

type Props = {
  children: React.ReactNode;
};

function Note({ children }: Props) {
  return (
    <p className={`text ${styles.note}`}>
      <RiErrorWarningLine className="text" />

      {children}
    </p>
  );
}

export default Note;
