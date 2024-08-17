"use client";
import styles from "../Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useSelect } from "./useSelect";
import { Option } from "@/@types/SelectsComponents";
import { useModal } from "@/hooks/useModal";
import { useRef } from "react";

type Props = {
  selectName: string;
  label: string;
  options: Option[];

  optionSelected: string;
  handleOptionSelected: (newValue: string) => void;
};

function Select({
  selectName,
  label,
  options,
  optionSelected = options[0].name,
  handleOptionSelected
}: Props) {
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { toggleModal, modalIsOpen, handleIsOpen } = useModal(optionsRef);

  const { handleChangeInputOption } = useSelect(
    options,
    handleIsOpen,
    handleOptionSelected
  );

  if (options.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.select}>
      <label htmlFor={selectName}>{label}</label>

      <button className={styles.btnOpen} onClick={toggleModal}>
        {optionSelected}

        <IoIosArrowDown
          className={
            modalIsOpen ? `${styles.rotated} ${styles.icon}` : `${styles.icon}`
          }
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </button>

      {modalIsOpen && (
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
