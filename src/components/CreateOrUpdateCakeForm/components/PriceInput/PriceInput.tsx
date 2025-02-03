"use client";
import styles from "./PriceInput.module.scss";
import { capitalize } from "@/utils/formatStrings";
import { Size, SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import { CurrencyInput } from "react-currency-mask";
import { Control, Controller } from "react-hook-form";
import { SchemaCakeForm as Schema } from "../../utils/zodSchema";

type PriceInputProps = {
  size: Size;
  error?: string;
  control: Control<Schema>;
};

function PriceInput({ size, control, error }: PriceInputProps) {
  const dependentFields = SIZES_POSSIBLES_ENUM.reduce(
    (acm: `pricePerSize.${Size}`[], sizePossible) => {
      const field = `pricePerSize.${size}` as `pricePerSize.${Size}`;

      return sizePossible !== size ? [...acm, field] : [...acm];
    },
    []
  );

  return (
    <div className={`${styles.divPricePerSize}`} key={size}>
      <label className={"text"} htmlFor={`pricePerSize.${size}`}>
        {capitalize(size)}:
      </label>

      <Controller
        control={control}
        name={`pricePerSize.${size}`}
        rules={{
          required: true,
          deps: dependentFields
        }}
        defaultValue={0}
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
                id={`pricePerSize.${size}`}
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
