import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import styles from "../Select.module.scss";

type OptionSelectProps = InputHTMLAttributes<HTMLInputElement> & {
  optionName: string;
  isNullOption?: boolean;
  isSelected: boolean;
  type: "radio" | "checkbox";
  name: string;
  handleChangeOption: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OptionSelect = forwardRef<HTMLInputElement, OptionSelectProps>(
  (
    {
      optionName,
      isNullOption = false,
      isSelected,
      type,
      name,
      handleChangeOption,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`${styles.option} ${
          isSelected ? styles.optionSelected : ""
        }`}
      >
        <label htmlFor={optionName}>
          <p className={`${styles.label} text`}>{optionName}</p>
        </label>

        <input
          {...props}
          ref={ref}
          type={type}
          name={name}
          id={optionName}
          onChange={handleChangeOption}
          value={!isNullOption ? optionName : ""}
          hidden={true}
        />
      </div>
    );
  }
);

export default OptionSelect;
