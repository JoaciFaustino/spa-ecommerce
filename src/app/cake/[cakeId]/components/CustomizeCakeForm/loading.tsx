import SelectSkeleton from "@/components/Selects/loading";
import styles from "./CustomizeCakeForm.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import FillingsInputsSkeleton from "../FillingsInputs/loading";

function CustomizeCakeFormSkeleton() {
  return (
    <div className={styles.form}>
      <div className={`${styles.divTypeAndFrosting}`}>
        <div className={`${styles.divInput}`}>
          <SelectSkeleton label="Tipo da massa" />
        </div>

        <div className={`${styles.divInput}`}>
          <SelectSkeleton label="Cobertura:" />
        </div>
      </div>

      <FillingsInputsSkeleton />

      <div className={`${styles.divSizeInputs}`}>
        <label>Tamanho</label>
        <div className={styles.divRadioCheckbox}>
          {[1, 2, 3, 4].map((key) => (
            <div className={styles.divInput} key={key}>
              <div
                className={`loading`}
                style={{ height: "1rem", width: "1rem", borderRadius: "99px" }}
              ></div>

              <label className={`loading`}>skeleton</label>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.divInput}`}>
        <input type="text" className={`loading ${styles.quantityInput}`} />
      </div>

      <div className={styles.divPriceAndSubmitBtn}>
        <h2 className={`${styles.price}`}>R$ --,--</h2>

        <button type="submit" disabled>
          <CgShoppingCart style={{ color: "#fff", fontSize: "1rem" }} />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default CustomizeCakeFormSkeleton;
