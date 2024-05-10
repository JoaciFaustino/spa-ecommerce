"use client";
import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import styles from "./Input.module.scss";
import { Field } from "@/@types/Auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useInput } from "./useInput";

type Props = {
  name: string;
  label: string;
  type: string;
  messageError: string;
  fieldStates: Field;
  handleBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
};

function Input({
  name,
  label,
  type = "text",
  messageError,
  fieldStates,
  handleBlur,
  handleChange,
  autoFocus = false
}: Props) {
  const { inputRef, showPassword, passwordIsShowed } = useInput();

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.divInput}>
        <input
          autoFocus={autoFocus}
          ref={inputRef}
          type={inputRef.current?.type || type}
          id={name}
          name={name}
          value={fieldStates.value}
          placeholder={label}
          onBlur={handleBlur}
          onChange={handleChange}
          className={
            !fieldStates.isValid && fieldStates.wasBlur
              ? styles.inputInvalid
              : ""
          }
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

      {!fieldStates.isValid && fieldStates.wasBlur && (
        <span className={styles.errorMessage}>{messageError}</span>
      )}
    </div>
  );
}

export default Input;
