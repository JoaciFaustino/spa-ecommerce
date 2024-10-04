import SelectSkeleton from "@/components/Selects/loading";
import styles from "./FillingsInputs.module.scss";

function FillingsInputsSkeleton() {
  return (
    <div className={`${styles.fillingsDiv}`}>
      <label>Recheios</label>

      <div className={styles.divSelects}>
        {[1, 2, 3].map((key) => (
          <div className={styles.divSelect} key={key}>
            <SelectSkeleton />

            <button type="button" className={`loading ${styles.btnRemove}`}>
              <div style={{ width: "1.25rem", height: "1.25rem" }}></div>
            </button>
          </div>
        ))}
        <button type="button" className={`loading`}>
          Adicionar camada
        </button>
      </div>
    </div>
  );
}

export default FillingsInputsSkeleton;
