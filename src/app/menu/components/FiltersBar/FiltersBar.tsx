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
import { Option } from "@/@types/SelectsComponents";
import SortBy from "../SortBy/SortBy";

async function FiltersBar() {
  const [cakeTypesRes, categoriesRes, fillingsRes, frostingsRes] =
    await Promise.all([
      getAllCakeTypes(),
      getAllCategories(),
      getAllFillings(),
      getAllFrostings()
    ]);

  const sizes: Option[] | undefined = SIZES_POSSIBLES_ENUM.map(
    (size, index) => ({ id: index, name: size })
  );
  const cakeTypes: Option[] | undefined = cakeTypesRes?.map(
    ({ type, _id = type }) => ({ id: _id, name: type })
  );
  const categories: Option[] | undefined = categoriesRes?.map(
    ({ category, _id = category }) => ({ id: _id, name: category })
  );
  const fillings: Option[] | undefined = fillingsRes?.map(
    ({ name, _id = name }) => ({ id: _id, name: name })
  );
  const frostings: Option[] | undefined = frostingsRes?.map(
    ({ name, _id = name }) => ({ id: _id, name: name })
  );

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
          sizes={sizes}
        />
      </div>
    </section>
  );
}

export default FiltersBar;
