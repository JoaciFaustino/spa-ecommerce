"use server";
import styles from "./FiltersBar.module.scss";
import {
  getAllCakeTypes,
  getAllCategories,
  getAllFillings,
  getAllFrostings
} from "@/services/requests";
import SearchInput from "@/components/SearchInput/SearchInput";
import { SIZES_POSSIBLES_ENUM } from "@/@types/Cake";
import FilterSelects from "../FilterSelects/FilterSelects";
import SortBy from "../SortBy/SortBy";

async function FiltersBar() {
  const [cakeTypesRes, categoriesRes, fillingsRes, frostingsRes] =
    await Promise.all([
      getAllCakeTypes(),
      getAllCategories(),
      getAllFillings(),
      getAllFrostings()
    ]);

  const cakeTypes = cakeTypesRes?.map(({ type }) => type) || [];
  const categories = categoriesRes?.map(({ category }) => category) || [];
  const fillings = fillingsRes?.map(({ name }) => name) || [];
  const frostings = frostingsRes?.map(({ name }) => name) || [];

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
          cakeTypes={cakeTypes}
          categories={categories}
          fillings={fillings}
          frostings={frostings}
          sizes={[...SIZES_POSSIBLES_ENUM]}
        />
      </div>
    </section>
  );
}

export default FiltersBar;
