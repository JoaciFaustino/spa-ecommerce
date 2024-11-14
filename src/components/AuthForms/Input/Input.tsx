"use client";
import styles from "./Input.module.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { forwardRef, InputHTMLAttributes } from "react";
import { useInput } from "./useInput";

type Props = {
  label: string;
  type: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", error, name, placeholder, ...props }, ref) => {
    const { showPassword, passwordIsShowed, normalizedType } = useInput(type);

    return (
      <div className={styles.inputGroup}>
        <label htmlFor={name}>{label}</label>
        <div className={styles.divInput}>
          <input
            ref={ref}
            type={normalizedType}
            id={name}
            name={name}
            placeholder={placeholder || label}
            className={!!error ? styles.inputInvalid : ""}
            {...props}
          />

          {type === "password" && (
            <button
              className={styles.btnEye}
              type="button"
              onClick={showPassword}
            >
              {!passwordIsShowed && (
                <FaRegEye
                  className={styles.iconEye}
                  style={{ fontSize: "1rem", color: "var(--primary-color)" }}
                />
              )}

              {passwordIsShowed && (
                <FaRegEyeSlash
                  className={styles.iconEye}
                  style={{ fontSize: "1rem", color: "var(--primary-color)" }}
                />
              )}
            </button>
          )}
        </div>

        {!!error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

export default Input;
