import styles from "./FiltersBar.module.scss";
import FilterSelectsSkeleton from "../FilterSelects/loading";
import SearchInput from "@/components/SearchInput/SearchInput";
import { Suspense } from "react";

async function FiltersBarSkeleton() {
  return (
    <section className={styles.filtersBar}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.divSearchAndSortBy}>
          <div className={styles.divSelectLoading}>
            <Suspense>
              <SearchInput placeholder="Pesquisar por nome..." />
            </Suspense>
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
