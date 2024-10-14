"use client";
import { ICake } from "@/@types/Cake";
import styles from "./CustomizeCakeForm.module.scss";
import { useEffect, useMemo, useState } from "react";
import FillingsInputs from "../FillingsInputs/FillingsInputs";
import { useCakeForm } from "./useCakeForm";
import { useCustomizableParts } from "./useCustomizableParts";
import { RiErrorWarningLine } from "react-icons/ri";
import { IFilling } from "@/@types/Filling";
import { IFrosting } from "@/@types/Frosting";
import { CgShoppingCart } from "react-icons/cg";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";
import SelectInfiniteScoll from "@/components/Selects/SelectInfiniteScroll/SelectInfiniteScroll";
import {
  getCakeTypesWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

type Props = {
  typeOptions?: string[];
  fillingsOptions?: IFilling[];
  frostingOptions?: IFrosting[];
  defaultCake: ICake;
};

const paginatedSelectProps = { initialPage: 2, limit: 12 };

function CustomizeCakeForm({
  typeOptions = [],
  fillingsOptions = [],
  frostingOptions = [],
  defaultCake
}: Props) {
  const fillingsOptionsNames: string[] = useMemo(() => {
    return fillingsOptions.map(({ name }) => name);
  }, []);

  const frostingOptionsNames: string[] = useMemo(() => {
    return frostingOptions.map(({ name }) => name);
  }, []);

  const {
    typeSelected,
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
          <label>Tipo da massa:</label>

          <SelectInfiniteScoll
            initialOptions={typeOptions}
            defaultValue={defaultCake.type}
            onChangeOption={(newValue) =>
              setValue("type", newValue || typeSelected)
            }
            {...paginatedSelectProps}
            onLoadMoreOptions={async (page, limit) => {
              const res = await getCakeTypesWithErrorHandling(limit, page);

              return res.map(({ type }) => type);
            }}
          />

          <p className={styles.errorMessage}>{errors.type?.message}</p>
        </div>

        <div
          className={`${styles.divInput} ${
            !isCustomizableFrosting ? styles.disabled : ""
          }`}
        >
          <label>Cobertura:</label>

          <SelectInfiniteScoll
            initialOptions={frostingOptionsNames}
            defaultValue={defaultCake.frosting?.name}
            isRequired={false}
            nullOptionLabel="Sem cobertura"
            onChangeOption={(newValue) => setValue("frosting", newValue)}
            {...paginatedSelectProps}
            onLoadMoreOptions={async (page, limit) => {
              const res = await getFrostingsWithErrorHandling(limit, page);

              return res.map(({ name }) => name);
            }}
          />
        </div>
      </div>

      <FillingsInputs
        fillingsSelecteds={fillingsSelecteds}
        sizeSelected={sizeSelected}
        setFillings={setValue<"fillings">}
        selectInitialValue={fillingsOptionsNames[0]}
        fillingsOptions={fillingsOptionsNames}
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
