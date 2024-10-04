"use client";
import SelectMany from "@/components/Selects/SelectMany/SelectMany";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./FilterSelects.module.scss";
import { useState } from "react";
import { useMenuQueryParams } from "@/hooks/useMenuQueryParams";

type FilterSelectsProps = {
  cakeTypes?: string[];
  frostings?: string[];
  fillings?: string[];
  categories?: string[];
  sizes?: string[];
};

const generateHandler = (setOptionsSelecteds: (...args: any[]) => any) => {
  return (newOptionsSelecteds: string[]) => {
    setOptionsSelecteds(
      newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null
    );
  };
};

function FilterSelects({
  cakeTypes = [],
  frostings = [],
  fillings = [],
  sizes = [],
  categories = []
}: FilterSelectsProps) {
  const [filtersIsOpen, setFiltersIsOpen] = useState(true);

  const {
    type,
    setType,
    frosting,
    setFrosting,
    category,
    setCategory,
    size,
    setSize,
    filling,
    setFilling
  } = useMenuQueryParams();

  return (
    <details open className={styles.detailsSelectFilters}>
      <summary
        className={styles.summary}
        onClick={() => setFiltersIsOpen((prev) => !prev)}
      >
        <p>Filtros:</p>
        <IoIosArrowDown
          className={`${styles.icon} ${filtersIsOpen ? styles.rotated : ""}`}
          style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        />
      </summary>

      <div className={`${styles.filterSelects}`}>
        <SelectMany
          placeholder="Tipo de massa"
          options={cakeTypes}
          onChangedOptionsSelecteds={generateHandler(setType)}
          newSelectedsOptions={type || []}
        />

        <SelectMany
          placeholder="Cobertura"
          options={frostings}
          onChangedOptionsSelecteds={generateHandler(setFrosting)}
          newSelectedsOptions={frosting || []}
        />

        <SelectMany
          placeholder="Recheio"
          options={fillings}
          onChangedOptionsSelecteds={generateHandler(setFilling)}
          newSelectedsOptions={filling || []}
        />

        <SelectMany
          placeholder="Tamanho"
          options={sizes}
          onChangedOptionsSelecteds={generateHandler(setSize)}
          newSelectedsOptions={size || []}
        />

        <SelectMany
          placeholder="Categoria"
          options={categories}
          onChangedOptionsSelecteds={generateHandler(setCategory)}
          newSelectedsOptions={category || []}
        />
      </div>
    </details>
  );
}

export default FilterSelects;
