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
import { useCalculatePricing } from "./useCalculatePricing";
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

const getFillingsSelectedsObjs = (
  fillingsSelectedsStrings: string[],
  fillingsOptions: IFilling[]
): IFilling[] => {
  const fillingsObjs: IFilling[] = fillingsSelectedsStrings.reduce(
    (fillingsObjs: IFilling[], fillingSelected: string) => {
      const [fillingObj] = fillingsOptions.filter(
        ({ name }) => name === fillingSelected
      );

      if (!fillingObj) {
        return [...fillingsObjs];
      }

      return [...fillingsObjs, fillingObj];
    },

    []
  );

  return fillingsObjs;
};

const getFrostingSelectedObj = (
  frostingSelected: string | undefined,
  frostingOptions: IFrosting[]
): IFrosting | undefined => {
  const [frostingsObj] = frostingOptions.filter(
    ({ name }) => name === frostingSelected
  );

  if (!frostingsObj) {
    return;
  }

  return frostingsObj;
};

function CustomizeCakeForm({
  typeOptions = [],
  fillingsOptions = [],
  frostingOptions = [],
  defaultCake: {
    _id: cakeId,
    type: defaultType,
    frosting: defaultFrosting,
    fillings: defaultFillings,
    size: defaultSize,
    sizesPossibles,
    customizableParts,
    pricePerSize
  }
}: Props) {
  const {
    typeSelected,
    frostingSelected,
    fillingsSelecteds,
    sizeSelected,
    quantity,
    isSubmitting,
    isSubmitted,
    isValid,
    handleSubmit,
    errors,
    register,
    setValue,
    handleChangeQuantity
  } = useCakeForm(
    cakeId,
    defaultType,
    defaultFrosting,
    defaultSize,
    defaultFillings
  );

  const [fillingsOptionsNames] = useState<string[]>(
    fillingsOptions.map(({ name }) => name)
  );
  const [frostingOptionsNames] = useState<string[]>(
    frostingOptions.map(({ name }) => name)
  );

  const {
    isCustomizableCakeType,
    isCustomizableFillings,
    isCustomizableFrosting,
    isCustomizableSize,
    messageNoCustomizableParts
  } = useCustomizableParts(
    customizableParts,
    typeOptions,
    fillingsOptionsNames,
    frostingOptionsNames,
    sizesPossibles
  );

  const { totalPriceString, totalPriceNumber } = useCalculatePricing(
    pricePerSize[sizeSelected] || 0,
    getFillingsSelectedsObjs(fillingsSelecteds, fillingsOptions),
    getFrostingSelectedObj(frostingSelected, frostingOptions),
    quantity
  );

  const [isMounted, setIsMounted] = useState(false);

  const submitIsDisabled =
    totalPriceNumber <= 0 ||
    Number.isNaN(totalPriceNumber) ||
    !isMounted ||
    !isValid ||
    isSubmitting ||
    isSubmitted;

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
            optionSelected={typeSelected || defaultType}
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
          {sizesPossibles.map((size) => (
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
          {submitIsDisabled ? "R$ --,--" : totalPriceString}
        </h2>

        <button type="submit" disabled={submitIsDisabled}>
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
