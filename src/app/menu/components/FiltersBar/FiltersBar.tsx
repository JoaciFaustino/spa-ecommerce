"use server";
import styles from "./FiltersBar.module.scss";
import SearchInput from "@/components/SearchInput/SearchInput";
import { SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import FilterSelects from "../FilterSelects/FilterSelects";
import SortBy from "../SortBy/SortBy";
import {
  getCakeTypesWithErrorHandling,
  getCategoriesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

const page = 1;
const limit = 24;

async function FiltersBar() {
  const [cakeTypes, categories, fillings, frostings] = await Promise.all([
    getCakeTypesWithErrorHandling(limit, page),
    getCategoriesWithErrorHandling(limit, page),
    getFillingsWithErrorHandling(limit, page),
    getFrostingsWithErrorHandling(limit, page)
  ]);

  const cakeTypesNames = cakeTypes.map(({ type }) => type);
  const categoriesNames = categories.map(({ category }) => category);
  const fillingsNames = fillings.map(({ name }) => name);
  const frostingsNames = frostings.map(({ name }) => name);

  return (
    <section className={styles.filtersBar}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.divSearchAndSortBy}>
          <div className={styles.divSearch}>
            <SearchInput placeholder="Pesquisar por nome..." />
          </div>

          <div className={styles.divSortBy}>
            <SortBy />
          </div>
        </div>

        <FilterSelects
          initialCakeTypes={cakeTypesNames}
          initialCategories={categoriesNames}
          initialFillings={fillingsNames}
          initialFrostings={frostingsNames}
          initialSizes={[...SIZES_POSSIBLES_ENUM]}
        />
      </div>
    </section>
  );
}

export default FiltersBar;
