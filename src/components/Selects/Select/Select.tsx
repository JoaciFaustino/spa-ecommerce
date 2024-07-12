"use client";
import styles from "../Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useSelect } from "./useSelect";

type Props = {
  selectName: string;
  label: string;
  options: string[];
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
          {options.map((option, index) => (
            <div
              key={index}
              className={
                optionSelected === option
                  ? `${styles.optionSelected} ${styles.option}`
                  : `${styles.option}`
              }
            >
              <label htmlFor={option}>
                <p className={`${styles.label} text`}>{option}</p>
              </label>

              <input
                type="radio"
                id={option}
                name={selectName}
                checked={optionSelected === option}
                value={option}
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
