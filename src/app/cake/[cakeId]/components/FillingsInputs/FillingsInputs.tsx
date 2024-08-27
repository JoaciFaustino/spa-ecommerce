import { Size } from "@/@types/Cake";
import { SetValuesFillingsFunction, useFillings } from "./useFillings";
import styles from "./FillingsInputs.module.scss";
import Select from "@/components/Selects/Select/Select";
import { Option } from "@/@types/SelectsComponents";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

type Props = {
  isCustomizable: boolean;
  fillingsSelecteds: string[];
  sizeSelected: Size;
  setFillings: SetValuesFillingsFunction;
  selectInitialValue: string;
  fillingsOptions: Option[];
  errorMessage?: string;
};

function FillingsInputs({
  fillingsSelecteds,
  sizeSelected,
  setFillings,
  selectInitialValue,
  fillingsOptions,
  errorMessage,
  isCustomizable
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
      <label>Recheios</label>

      <div className={styles.divSelects}>
        {fillingsSelecteds.length === 0 && <p className="text">Sem recheio</p>}

        {fillingsSelecteds.map((filling, index) => (
          <div className={styles.divSelect} key={index}>
            <Select
              handleOptionSelected={selectHandlerFillingValue(index)}
              optionSelected={filling}
              options={fillingsOptions}
              selectName={`layer-${index}`}
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
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default FillingsInputs;
