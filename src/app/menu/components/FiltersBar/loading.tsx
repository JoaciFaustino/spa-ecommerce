import { IoIosArrowDown } from "react-icons/io";
import styles from "./FiltersBar.module.scss";
import FilterSelectsSkeleton from "../FilterSelects/loading";

async function FiltersBarSkeleton() {
  return (
    <section className={styles.filtersBar}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.divSearchAndSortBy}>
          <div className={styles.divSelectLoading}>
            <span className={`${styles.selectLoading} loading text`}>J</span>
          </div>

          <div className={styles.divSelectLoading}>
            <p>Ordenar por:</p>
            <span className={`${styles.selectLoading} loading text`}>J</span>
          </div>
        </div>

        <FilterSelectsSkeleton />
      </div>
    </section>
  );
}

export default FiltersBarSkeleton;
