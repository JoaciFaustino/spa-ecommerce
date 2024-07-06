"use client";
import { IoIosArrowDown, IoIosArrowUp, IoIosCloseCircle } from "react-icons/io";
import styles from "../Select.module.scss";
import { useSelectMany } from "./useSelectMany";

type Props = {
  placeholder: string;
  selectName: string;
  optionsDefault?: string[];
  queryParam?: string;
};

function SelectMany({
  placeholder,
  selectName,
  queryParam,
  optionsDefault = []
}: Props) {
  const {
    optionsIsOpen,
    handleChangeCheckbox,
    optionsRef,
    optionsSelecteds,
    openOptions,
    inputValue,
    handleChangeSearch,
    options,
    clearOptionsSelecteds
  } = useSelectMany(optionsDefault, queryParam);

  return (
    <div className={styles.select}>
      <div className={styles.divInputSelect}>
        <input
          type="text"
          placeholder={placeholder}
          onClick={openOptions}
          onFocus={openOptions}
          style={
            optionsSelecteds.length
              ? { paddingRight: "calc(var(--padding-16) + 1rem)" }
              : {}
          }
          onChange={handleChangeSearch}
          value={inputValue}
        />

        <div className={styles.divIcons} onClick={openOptions}>
          {optionsSelecteds.length > 0 && (
            <div className={styles.divCountSelected}>
              <p className="textSmall">{optionsSelecteds.length}</p>

              <IoIosCloseCircle
                onClick={clearOptionsSelecteds}
                className={styles.icon}
                style={{
                  color: "#fff",
                  fontSize: "1rem"
                }}
              />
            </div>
          )}

          <IoIosArrowDown
            onClick={openOptions}
            className={
              optionsIsOpen
                ? `${styles.rotated} ${styles.icon}`
                : `${styles.icon}`
            }
            style={{ color: "#fff", fontSize: "1rem" }}
          />
        </div>
      </div>

      {optionsIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {options.map((option, index) => (
            <div
              key={index}
              className={
                optionsSelecteds.includes(option)
                  ? `${styles.optionSelected} ${styles.option}`
                  : `${styles.option}`
              }
            >
              <label htmlFor={option} className={styles.label}>
                <p className="text">{option}</p>
              </label>

              <input
                type="checkbox"
                id={option}
                name={selectName}
                checked={optionsSelecteds.includes(option)}
                value={option}
                onChange={handleChangeCheckbox}
                hidden={true}
              />
            </div>
          ))}

          {inputValue !== "" && options.length === 0 && (
            <p className={`${styles.textWarning} text`}>
              Não existe essa opção
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectMany;
