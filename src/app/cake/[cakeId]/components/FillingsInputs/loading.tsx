import SelectLoading from "@/components/Selects/loading";
import styles from "./FillingsInputs.module.scss";
import { BsTrash } from "react-icons/bs";

function FillingsInputsLoading() {
  return (
    <div className={`${styles.fillingsDiv}`}>
      <label>Recheios</label>

      <div className={styles.divSelects}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div className={styles.divSelect} key={index}>
            <SelectLoading />

            <div className={`${styles.btnRemoveLoading} loading`}>
              <BsTrash style={{ color: "transparent", fontSize: "1.25rem" }} />
            </div>
          </div>
        ))}

        <SelectLoading />
      </div>
    </div>
  );
}
export default FillingsInputsLoading;
