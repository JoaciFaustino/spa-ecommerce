import SelectLoading from "@/components/Selects/loading";
import styles from "./CustomizeCakeForm.module.scss";
import FillingsInputsLoading from "../FillingsInputs/loading";

function CustomizeCakeFormSkeleton() {
  return (
    <div className={styles.form}>
      <div className={`${styles.divTypeAndFrosting}`}>
        <div className={`${styles.divInput}`}>
          <SelectLoading label="Tipo da massa: " />
        </div>

        <div className={`${styles.divInput}`}>
          <SelectLoading label="Cobertura: " />
        </div>
      </div>

      <FillingsInputsLoading />

      <div className={`${styles.divSizeInputs}`}>
        <label>Tamanho</label>
        <div className={styles.divRadioCheckbox}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className={`${styles.divInput} loading`} key={index}>
              <label className={`loading`} style={{ height: "1rem" }}></label>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.divInput}`}>
        <SelectLoading />
      </div>

      <div className={styles.divPriceAndSubmitBtn}>
        <h2 className={styles.price}>R$ --,--</h2>

        <SelectLoading />
      </div>
    </div>
  );
}

export default CustomizeCakeFormSkeleton;
