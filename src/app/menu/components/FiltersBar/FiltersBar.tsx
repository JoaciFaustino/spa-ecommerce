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
import Select from "@/components/Selects/Select/Select";

import FilterSelects from "../FilterSelects/FilterSelects";

async function FiltersBar() {
  const [cakeTypesRes, categoriesRes, fillingsRes, frostingsRes] =
    await Promise.all([
      getAllCakeTypes(),
      getAllCategories(),
      getAllFillings(),
      getAllFrostings()
    ]);

  const sortByOptions: string[] = [
    "popularidade",
    "preço: do maior para o menor",
    "preço: do menor para o maior",
    "novos"
  ];
  const sizes = [...SIZES_POSSIBLES_ENUM];
  const cakeTypes = cakeTypesRes?.map((cakeType) => cakeType.type);
  const categories = categoriesRes?.map((categorie) => categorie.category);
  const fillings = fillingsRes?.map((filling) => filling.name);
  const frostings = frostingsRes?.map((frosting) => frosting.name);

  return (
    <section className={styles.filtersBar}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.divSearchAndSortBy}>
          <div className={styles.divSearch}>
            <SearchInput placeholder="Pesquisar por nome..." />
          </div>

          <div className={styles.divSortBy}>
            <Select
              selectName="sortBy"
              label="Ordenar por:"
              options={sortByOptions}
              queryParam="sortBy"
            />
          </div>
        </div>
        {}
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
