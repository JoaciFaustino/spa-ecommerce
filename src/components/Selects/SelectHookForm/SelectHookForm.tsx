import styles from "../Select.module.scss";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { IoIosArrowDown } from "react-icons/io";
import { Option } from "@/@types/SelectsComponents";

type SelectHookFormProps = {
  inputsHtmlAttributes: React.InputHTMLAttributes<HTMLInputElement>;

  label?: string;
  options: Option[];
  optionSelected: string;
  required?: boolean;
  nullOptionLabel?: string;

  buttonStyle?: CSSProperties;
  containerOptionsStyle?: CSSProperties;
  optionStyle?: CSSProperties;
};

function SelectHookForm({
  inputsHtmlAttributes,
  required = true,
  label,
  options,
  nullOptionLabel,
  optionSelected = options[0].name,
  buttonStyle,
  containerOptionsStyle,
  optionStyle
}: SelectHookFormProps) {
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { toggleModal, modalIsOpen } = useModal(optionsRef);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (options.length === 0) {
    return <></>;
  }

  return (
    <div className={`${!isMounted ? styles.disabled : ""} ${styles.select}`}>
      {!!label && <label>{label}</label>}

      <button
        className={styles.btnOpen}
        style={buttonStyle}
        onClick={toggleModal}
        type="button"
      >
        <p>{optionSelected !== "" ? optionSelected : nullOptionLabel}</p>

        <div className={styles.divIcon}>
          <IoIosArrowDown
            className={`${styles.icon} ${modalIsOpen ? styles.rotated : ""}`}
            style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
          />
        </div>
      </button>

      {modalIsOpen && (
        <div
          className={styles.divOptions}
          ref={optionsRef}
          style={containerOptionsStyle}
        >
          {!required && (
            <InputOption
              optionLabel={nullOptionLabel || "None"}
              value={""}
              isSelected={optionSelected === ""}
              inputsHtmlAttributes={inputsHtmlAttributes}
              optionStyle={optionStyle}
              isRequiredOption={false}
            />
          )}

          {options.map((option) => (
            <InputOption
              key={option.id}
              optionLabel={option.name}
              value={option.name}
              isSelected={optionSelected === option.name}
              inputsHtmlAttributes={inputsHtmlAttributes}
              optionStyle={optionStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type InputOptionProps = {
  inputsHtmlAttributes: React.InputHTMLAttributes<HTMLInputElement>;
  optionLabel: string;
  value: string;
  isSelected: boolean;
  optionStyle?: CSSProperties;
  isRequiredOption?: boolean;
};

function InputOption({
  value,
  optionLabel,
  isSelected,
  optionStyle,
  isRequiredOption = true,
  inputsHtmlAttributes
}: InputOptionProps) {
  return (
    <div
      className={
        isSelected
          ? `${styles.optionSelected} ${styles.option}`
          : `${styles.option}`
      }
      style={optionStyle}
    >
      <label htmlFor={optionLabel}>
        <p className={`${styles.label} text`}>{optionLabel}</p>
      </label>

      <input
        {...inputsHtmlAttributes}
        type="radio"
        id={optionLabel}
        value={isRequiredOption ? value : ""}
        hidden
      />
    </div>
  );
}

export default SelectHookForm;
