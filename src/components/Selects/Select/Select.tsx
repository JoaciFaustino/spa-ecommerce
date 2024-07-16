"use client";
import styles from "../Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useSelect } from "./useSelect";
import { Option } from "@/@types/SelectsComponents";

type Props = {
  selectName: string;
  label: string;
  options: Option[];
  queryParam?: string;
};

function Select({ selectName, label, options, queryParam }: Props) {
  const {
    optionsIsOpen,
    optionsRef,
    handleClickButton,
    optionSelected,
    handleChangeInputOption
  } = useSelect(options, queryParam);

  if (options.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.select}>
      <label htmlFor={selectName}>{label}</label>

      <button className={styles.btnOpen} onClick={handleClickButton}>
        {optionSelected}

        <IoIosArrowDown
          className={
            optionsIsOpen
              ? `${styles.rotated} ${styles.icon}`
              : `${styles.icon}`
          }
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </button>

      {optionsIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {options.map((option) => (
            <div
              key={option.id}
              className={
                optionSelected === option.name
                  ? `${styles.optionSelected} ${styles.option}`
                  : `${styles.option}`
              }
            >
              <label htmlFor={option.name}>
                <p className={`${styles.label} text`}>{option.name}</p>
              </label>

              <input
                type="radio"
                id={option.name}
                name={selectName}
                checked={optionSelected === option.name}
                value={option.name}
                onChange={handleChangeInputOption}
                hidden={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
