"use client";
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import styles from "../Select.module.scss";
import { useSelectMany } from "./useSelectMany";
import { Option } from "@/@types/SelectsComponents";

type Props = {
  placeholder: string;
  selectName: string;
  optionsDefault?: Option[];
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
    optionsNormalizeds,
    clearOptionsSelecteds
  } = useSelectMany(optionsDefault, queryParam);

  if (optionsDefault.length === 0) {
    return <></>;
  }

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
                style={{ color: "#fff", fontSize: "1rem" }}
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
          {optionsNormalizeds.map((option) => (
            <div
              key={option.id}
              className={
                optionsSelecteds.includes(option.name)
                  ? `${styles.optionSelected} ${styles.option}`
                  : `${styles.option}`
              }
            >
              <label htmlFor={option.name} className={styles.label}>
                <p className="text">{option.name}</p>
              </label>

              <input
                type="checkbox"
                id={option.name}
                name={selectName}
                checked={optionsSelecteds.includes(option.name)}
                value={option.name}
                onChange={handleChangeCheckbox}
                hidden={true}
              />
            </div>
          ))}

          {inputValue !== "" && optionsNormalizeds.length === 0 && (
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
