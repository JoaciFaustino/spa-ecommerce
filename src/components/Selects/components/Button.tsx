import { IoIosArrowDown } from "react-icons/io";
import styles from "../Select.module.scss";

type ButtonProps = {
  isDisabled: boolean;
  toogleOptions: () => void;
  textContent: string;
  optionsIsOpen: boolean;
};

function Button({
  isDisabled,
  optionsIsOpen,
  textContent,
  toogleOptions
}: ButtonProps) {
  return (
    <button
      className={styles.btnOpen}
      onClick={toogleOptions}
      type="button"
      disabled={isDisabled}
    >
      <p>{textContent}</p>

      <div className={styles.divIcon}>
        <IoIosArrowDown
          className={`${styles.icon} ${optionsIsOpen ? styles.rotated : ""}`}
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </div>
    </button>
  );
}

export default Button;
