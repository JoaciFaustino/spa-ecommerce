import SearchInput from "@/components/SearchInput/SearchInput";
import styles from "./FiltersBar.module.scss";
import SortBy from "../SortBy/SortBy";
import Filter from "../Filter/Filter";

function FiltersBar() {
  return (
    <div className={styles.filtersBar}>
      <div className={styles.sortByAndFilter}>
        <SortBy />

        <Filter />
      </div>

      <div className={styles.searchInput}>
        <label htmlFor="search-input">Pesquisar por cliente:</label>

        <SearchInput placeholder="Pesquisar por cliente" />
      </div>
    </div>
  );
}

export default FiltersBar;
