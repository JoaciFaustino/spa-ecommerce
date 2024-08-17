"use client";
import SelectMany from "@/components/Selects/SelectMany/SelectMany";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./FilterSelects.module.scss";
import { useState } from "react";
import { Option } from "@/@types/SelectsComponents";
import { useMenuQueryParams } from "@/hooks/useMenuQueryParams";

type FilterSelectsProps = {
  cakeTypes?: Option[];
  frostings?: Option[];
  fillings?: Option[];
  categories?: Option[];
  sizes?: Option[];
};

function FilterSelects({
  cakeTypes,
  frostings,
  fillings,
  sizes,
  categories
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

  const handleTypesSelecteds = (newOptionsSelecteds: string[]) => {
    setType(newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null);
  };

  const handleFrostingSelecteds = (newOptionsSelecteds: string[]) => {
    setFrosting(newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null);
  };

  const handleCategoriesSelecteds = (newOptionsSelecteds: string[]) => {
    setCategory(newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null);
  };

  const handleSizesSelecteds = (newOptionsSelecteds: string[]) => {
    setSize(newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null);
  };

  const handleFillingsSelecteds = (newOptionsSelecteds: string[]) => {
    setFilling(newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null);
  };

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
          selectName="types"
          optionsDefault={cakeTypes}
          handleOptionsSelecteds={handleTypesSelecteds}
          optionsSelecteds={type || []}
        />

        <SelectMany
          placeholder="Cobertura"
          selectName="frostings"
          optionsDefault={frostings}
          handleOptionsSelecteds={handleFrostingSelecteds}
          optionsSelecteds={frosting || []}
        />

        <SelectMany
          placeholder="Recheio"
          selectName="fillings"
          optionsDefault={fillings}
          handleOptionsSelecteds={handleFillingsSelecteds}
          optionsSelecteds={filling || []}
        />

        <SelectMany
          placeholder="Tamanho"
          selectName="sizes"
          optionsDefault={sizes}
          handleOptionsSelecteds={handleSizesSelecteds}
          optionsSelecteds={size || []}
        />

        <SelectMany
          placeholder="Categoria"
          selectName="categories"
          optionsDefault={categories}
          handleOptionsSelecteds={handleCategoriesSelecteds}
          optionsSelecteds={category || []}
        />
      </div>
    </details>
  );
}

export default FilterSelects;
