import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import styles from "../Select.module.scss";
import { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  optionsSelecteds: string[];
  inputValue: string;
  openOptions: () => void;
  clearOptionsSelecteds: () => void;
  optionsIsOpen: boolean;
  handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  isMounted: boolean;
};

function InputSelectMany({
  placeholder,
  optionsSelecteds,
  inputValue,
  isMounted,
  optionsIsOpen,
  openOptions,
  handleChangeSearch,
  clearOptionsSelecteds
}: Props) {
  return (
    <div className={styles.divInputSelect}>
      <input
        type="text"
        placeholder={placeholder}
        onClick={openOptions}
        onFocus={openOptions}
        style={{
          paddingRight: optionsSelecteds.length
            ? "calc(var(--padding-16) + 1rem)"
            : undefined
        }}
        onChange={handleChangeSearch}
        value={inputValue}
      />

      <div className={styles.divIcons} onClick={openOptions}>
        {isMounted && optionsSelecteds.length > 0 && (
          <div className={styles.divCountSelected}>
            <p className="textSmall">{optionsSelecteds.length}</p>

            <IoIosCloseCircle
              onClick={clearOptionsSelecteds}
              className={styles.icon}
              style={{ color: "#fff", fontSize: "1rem" }}
            />
          </div>
        )}

        <IoIosArrowDown
          onClick={openOptions}
          className={`${styles.icon} ${optionsIsOpen ? styles.rotated : ""}`}
          style={{ color: "#fff", fontSize: "1rem" }}
        />
      </div>
    </div>
  );
}

export default InputSelectMany;
