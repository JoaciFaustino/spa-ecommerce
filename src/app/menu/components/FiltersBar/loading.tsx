import { IoIosArrowDown } from "react-icons/io";
import styles from "./FiltersBar.module.scss";
import FilterSelectsSkeleton from "../FilterSelects/loading";
import SearchInput from "@/components/SearchInput/SearchInput";

async function FiltersBarSkeleton() {
  return (
    <section className={styles.filtersBar}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.divSearchAndSortBy}>
          <div className={styles.divSelectLoading}>
            <SearchInput placeholder="Pesquisar por nome..." />
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
