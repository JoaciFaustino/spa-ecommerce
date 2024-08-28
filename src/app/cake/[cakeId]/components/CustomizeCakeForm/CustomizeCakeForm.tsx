"use client";
import { ICake } from "@/@types/Cake";
import styles from "./CustomizeCakeForm.module.scss";
import SelectHookForm from "@/components/Selects/SelectHookForm/SelectHookForm";
import { Option } from "@/@types/SelectsComponents";
import React, { useEffect, useState } from "react";
import FillingsInputs from "../FillingsInputs/FillingsInputs";
import { useCakeForm } from "./useCakeForm";
import { useCustomizableParts } from "./useCustomizableParts";
import { RiErrorWarningLine } from "react-icons/ri";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { CgShoppingCart } from "react-icons/cg";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

type Props = {
  typeOptions?: string[];
  fillingsOptions?: IFilling[];
  frostingOptions?: IFrosting[];
  defaultCake: ICake;
};

const createSelectOptions = (options: string[]): Option[] => {
  return options.map((option, index) => ({ id: index, name: option }));
};

function CustomizeCakeForm({
  typeOptions = [],
  fillingsOptions = [],
  frostingOptions = [],
  defaultCake
}: Props) {
  const [fillingsOptionsNames] = useState<string[]>(
    fillingsOptions.map(({ name }) => name)
  );
  const [frostingOptionsNames] = useState<string[]>(
    frostingOptions.map(({ name }) => name)
  );

  const {
    typeSelected,
    frostingSelected,
    fillingsSelecteds,
    sizeSelected,
    totalPriceString,
    isSubmitting,
    submitIsDisabled,
    handleSubmit,
    errors,
    register,
    setValue,
    handleChangeQuantity
  } = useCakeForm(defaultCake, fillingsOptions, frostingOptions);

  const {
    isCustomizableCakeType,
    isCustomizableFillings,
    isCustomizableFrosting,
    isCustomizableSize,
    messageNoCustomizableParts
  } = useCustomizableParts(
    defaultCake.customizableParts,
    typeOptions,
    fillingsOptionsNames,
    frostingOptionsNames,
    defaultCake.sizesPossibles
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.divTypeAndFrosting}`}>
        <div
          className={`${styles.divInput} ${
            !isCustomizableCakeType ? styles.disabled : ""
          }`}
        >
          <SelectHookForm
            label="Tipo da massa"
            inputsHtmlAttributes={register("type")}
            options={createSelectOptions(typeOptions)}
            optionSelected={typeSelected || defaultCake.type}
            containerOptionsStyle={{ maxHeight: "12rem" }}
          />

          <p className={styles.errorMessage}>{errors.type?.message}</p>
        </div>

        <div
          className={`${styles.divInput} ${
            !isCustomizableFrosting ? styles.disabled : ""
          }`}
        >
          <SelectHookForm
            label="Cobertura:"
            inputsHtmlAttributes={register("frosting")}
            options={createSelectOptions(frostingOptionsNames)}
            optionSelected={frostingSelected || ""}
            containerOptionsStyle={{ maxHeight: "12rem" }}
            required={false}
            nullOptionLabel="Sem cobertura"
          />
        </div>
      </div>

      <FillingsInputs
        fillingsSelecteds={fillingsSelecteds}
        sizeSelected={sizeSelected}
        setFillings={setValue<"fillings">}
        selectInitialValue={fillingsOptionsNames[0]}
        fillingsOptions={createSelectOptions(fillingsOptionsNames)}
        errorMessage={errors.fillings?.message}
        isCustomizable={isCustomizableFillings}
      />

      <div
        className={`${styles.divSizeInputs} ${
          !isCustomizableSize ? styles.disabled : ""
        }`}
      >
        <label>Tamanho</label>
        <div className={styles.divRadioCheckbox}>
          {defaultCake.sizesPossibles.map((size) => (
            <div className={styles.divInput} key={size}>
              <input
                {...register("size", { required: true })}
                type="radio"
                value={size}
                id={size}
                disabled={!isMounted}
              />
              <label
                htmlFor={size}
                className={`${
                  !isCustomizableSize || !isMounted ? styles.disabled : ""
                }`}
              >
                {size}
              </label>
            </div>
          ))}

          <p className={styles.errorMessage}>{errors.size?.message}</p>
        </div>
      </div>

      <div className={`${styles.divInput}`}>
        <input
          {...register("quantity", {
            valueAsNumber: true,
            onChange: handleChangeQuantity
          })}
          type="number"
          disabled={!isMounted}
          className={styles.quantityInput}
        />
        <p className={styles.errorMessage}>{errors.quantity?.message}</p>
      </div>

      {!!messageNoCustomizableParts && (
        <p className={`text ${styles.customizablePartsMessage}`}>
          <RiErrorWarningLine style={{ fontSize: "1.25rem" }} />

          {messageNoCustomizableParts}
        </p>
      )}

      <div className={styles.divPriceAndSubmitBtn}>
        <h2 className={styles.price}>
          {!isMounted || submitIsDisabled ? "R$ --,--" : totalPriceString}
        </h2>

        <button type="submit" disabled={!isMounted || submitIsDisabled}>
          {!isSubmitting ? (
            <>
              <CgShoppingCart style={{ color: "#fff", fontSize: "1rem" }} />

              {"Adicionar ao carrinho"}
            </>
          ) : (
            <SpinnerLoader color="#fff" size={1} unitSize="rem" />
          )}
        </button>
      </div>
    </form>
  );
}

export default CustomizeCakeForm;
