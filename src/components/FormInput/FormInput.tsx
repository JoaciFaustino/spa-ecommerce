import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./FormInput.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", name, className, label, error, ...props }, ref) => {
    return (
      <div className={`${styles.divInput}`}>
        <label htmlFor={name}>{label}: </label>

        <input
          {...props}
          ref={ref}
          className={`${styles.input} ${className} ${
            !!error ? styles.inputInvalid : ""
          }`}
          name={name}
          type={type}
        />

        <p className={`text ${styles.messageError}`}>{error}</p>
      </div>
    );
  }
);

export default FormInput;
