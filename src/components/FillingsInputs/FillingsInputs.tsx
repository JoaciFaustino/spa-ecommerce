import { Size } from "@/@types/Cake";
import { useFillings } from "./useFillings";
import styles from "./FillingsInputs.module.scss";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import SelectInfiniteScoll from "@/components/Selects/SelectInfiniteScroll/SelectInfiniteScroll";

type Props = {
  label?: string;
  isCustomizable: boolean;
  fillingsSelecteds: string[];
  sizeSelected: Size;
  setFillings: (newFillings: string[]) => void;
  selectInitialValue: string;
  fillingsOptions: string[];
  errorMessage?: string;
  initialPage: number;
  onLoadMoreOptions: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<string[]> | string[];
};

function FillingsInputs({
  label,
  fillingsSelecteds,
  sizeSelected,
  setFillings,
  selectInitialValue,
  fillingsOptions,
  errorMessage,
  isCustomizable,
  initialPage,
  onLoadMoreOptions
}: Props) {
  const {
    addLayerFilling,
    maxLayersOfFillings,
    removeLayer,
    selectHandlerFillingValue
  } = useFillings(
    fillingsSelecteds,
    sizeSelected,
    setFillings,
    selectInitialValue
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <div
      className={`${styles.fillingsDiv} ${
        !isCustomizable ? styles.disabled : ""
      }`}
    >
      <label>{label || "Recheios"}</label>

      <div className={styles.divSelects}>
        {fillingsOptions.length === 0 && (
          <p className="text" style={{ color: "var(--color-warning-1)" }}>
            Ocorreu um erro! recarregue a página para personalizar os recheios!
          </p>
        )}

        {fillingsOptions.length !== 0 && fillingsSelecteds.length === 0 && (
          <p className="text">Sem recheio</p>
        )}

        {fillingsOptions.length !== 0 &&
          fillingsSelecteds.map((filling, index) => (
            <div className={styles.divSelect} key={index}>
              <SelectInfiniteScoll
                initialOptions={fillingsOptions}
                onChangeOption={selectHandlerFillingValue(index)}
                defaultValue={filling}
                initialPage={initialPage}
                limit={24}
                onLoadMoreOptions={onLoadMoreOptions}
              />

              <button
                type="button"
                className={styles.btnRemove}
                disabled={!isMounted}
                onClick={() => removeLayer(index)}
              >
                <BsTrash style={{ color: "#fff", fontSize: "1.25rem" }} />
              </button>
            </div>
          ))}

        <button
          type="button"
          onClick={addLayerFilling}
          disabled={
            fillingsSelecteds.length >= maxLayersOfFillings || !isMounted
          }
        >
          <BsPlusLg
            style={{ fontSize: "1rem", color: "var(--color-text-title)" }}
          />
          Adicionar camada
        </button>
        {errorMessage && (
          <p className={`text ${styles.errorMessage}`}>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default FillingsInputs;
