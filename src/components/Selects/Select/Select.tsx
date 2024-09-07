"use client";
import styles from "../Select.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useSelect } from "./useSelect";
import { Option } from "@/@types/SelectsComponents";
import { useModal } from "@/hooks/useModal";
import { useEffect, useRef, useState } from "react";

type Props = {
  selectName: string;
  label?: string;
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

  const [isMounted, setIsMounted] = useState(false);
  const isDisabled = !isMounted || options.length === 0;

  useEffect(() => setIsMounted(true), []);

  return (
    <div className={`${styles.select} ${isDisabled ? styles.disabled : ""}`}>
      {!!label && <label>{label}</label>}

      <button
        className={styles.btnOpen}
        onClick={toggleModal}
        type="button"
        disabled={isDisabled}
      >
        <p>{optionSelected}</p>

        <div className={styles.divIcon}>
          <IoIosArrowDown
            className={`${styles.icon} ${modalIsOpen ? styles.rotated : ""}`}
            style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
          />
        </div>
      </button>
      {modalIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${
                optionSelected === option.name ? styles.optionSelected : ""
              }`}
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
