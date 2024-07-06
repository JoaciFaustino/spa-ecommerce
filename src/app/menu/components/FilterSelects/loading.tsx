import { IoIosArrowDown } from "react-icons/io";
import styles from "./FilterSelects.module.scss";

function FilterSelectsSkeleton() {
  return (
    <details open className={styles.detailsSelectFilters}>
      <summary className={styles.summary}>
        <p>Filtros:</p>
        <IoIosArrowDown
          className={styles.icon}
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </summary>

      <div className={`${styles.filterSelects}`}>
        <span className={`${styles.selectLoading} loading text`}>J</span>
        <span className={`${styles.selectLoading} loading text`}>J</span>
        <span className={`${styles.selectLoading} loading text`}>J</span>
        <span className={`${styles.selectLoading} loading text`}>J</span>
        <span className={`${styles.selectLoading} loading text`}>J</span>
      </div>
    </details>
  );
}

export default FilterSelectsSkeleton;
