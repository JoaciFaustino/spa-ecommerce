"use client";
import styles from "./PriceInput.module.scss";
import { CurrencyInput } from "react-currency-mask";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue
} from "react-hook-form";

type PriceInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  error?: string;
  control: Control<T>;
  defaultPrice?: PathValue<T, Path<T>>;
};

function PriceInput<T extends FieldValues>({
  label,
  name,
  control,
  error,
  defaultPrice
}: PriceInputProps<T>) {
  return (
    <div className={`${styles.divPriceInput}`}>
      <label className={"text"} htmlFor={name}>
        {label}:
      </label>

      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        defaultValue={defaultPrice}
        render={({ field: { onChange, ...rest } }) => (
          <CurrencyInput
            {...rest}
            onChangeValue={(_, value) => onChange(value)}
            defaultValue={0}
            max={999.99}
            InputElement={
              <input
                type="text"
                className={`${styles.input} ${
                  !!error ? styles.inputInvalid : ""
                }`}
                id={name}
                placeholder="R$ 0,00"
              />
            }
          />
        )}
      />
    </div>
  );
}

export default PriceInput;
