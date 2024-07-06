"use client";
import SelectMany from "@/components/Selects/SelectMany/SelectMany";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./FilterSelects.module.scss";
import {  useState } from "react";

type Props = {
  cakeTypes?: string[];
  frostings?: string[];
  fillings?: string[];
  categories?: string[];
  sizes?: string[];
};

function FilterSelects({
  cakeTypes,
  frostings,
  fillings,
  sizes,
  categories
}: Props) {
  const [filtersIsOpen, setFiltersIsOpen] = useState(true);

  return (
    <details open className={styles.detailsSelectFilters}>
      <summary
        className={styles.summary}
        onClick={() => setFiltersIsOpen((prev) => !prev)}
      >
        <p>Filtros:</p>
        <IoIosArrowDown
          className={
            filtersIsOpen
              ? `${styles.rotated} ${styles.icon}`
              : `${styles.icon}`
          }
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </summary>

      <div className={`${styles.filterSelects}`}>
        <SelectMany
          placeholder="Tipo de massa"
          selectName="types"
          optionsDefault={cakeTypes}
          queryParam="type"
        />

        <SelectMany
          placeholder="Cobertura"
          selectName="frostings"
          optionsDefault={frostings}
          queryParam="frosting"
        />

        <SelectMany
          placeholder="Recheio"
          selectName="fillings"
          optionsDefault={fillings}
          queryParam="filling"
        />

        <SelectMany
          placeholder="Tamanho"
          selectName="sizes"
          optionsDefault={sizes}
          queryParam="size"
        />

        <SelectMany
          placeholder="Categoria"
          selectName="categories"
          optionsDefault={categories}
          queryParam="category"
        />
      </div>
    </details>
  );
}

export default FilterSelects;
