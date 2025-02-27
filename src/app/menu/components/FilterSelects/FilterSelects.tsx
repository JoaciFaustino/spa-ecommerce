"use client";
import SelectMany from "@/components/Selects/SelectMany/SelectMany";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./FilterSelects.module.scss";
import { useState } from "react";
import { useMenuQueryParams } from "@/hooks/useMenuQueryParams";
import SelectManyInfiniteScroll from "@/components/Selects/SelectManyInfiniteScroll/SelectManyInfiniteScroll";
import { Options } from "nuqs";
import {
  getCakeTypesWithErrorHandling,
  getCategoriesWithErrorHandling,
  getFillingsWithErrorHandling,
  getFrostingsWithErrorHandling
} from "@/utils/getCakePartsValues";

type FilterSelectsProps = {
  initialCakeTypes?: string[];
  initialFrostings?: string[];
  initialFillings?: string[];
  initialCategories?: string[];
  initialSizes?: string[];
};

type SetQueryParamsFunction = <Shallow>(
  value: string[] | ((old: string[] | null) => string[] | null) | null,
  options?: Options<Shallow> | undefined
) => Promise<URLSearchParams>;

const generateHandler = (setOptionsSelecteds: SetQueryParamsFunction) => {
  return (newOptionsSelecteds: string[]) => {
    setOptionsSelecteds(
      newOptionsSelecteds.length > 0 ? newOptionsSelecteds : null
    );
  };
};

const paginatedSelectProps = {
  initialPage: 2,
  limit: 24,
  searchDebounceTime: 500,
  usePaginationFunctionOnSearch: true
};

function FilterSelects({
  initialCakeTypes = [],
  initialFrostings = [],
  initialFillings = [],
  initialSizes = [],
  initialCategories = []
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
        <SelectManyInfiniteScroll
          placeholder="Tipo de massa"
          initialOptions={initialCakeTypes}
          onChangedOptionsSelecteds={generateHandler(setType)}
          newSelectedsOptions={type || []}
          {...paginatedSelectProps}
          onLoadMoreOptions={async (limit, page, search) => {
            const res = await getCakeTypesWithErrorHandling(
              page,
              limit,
              search
            );

            return res.map(({ type }) => type);
          }}
        />

        <SelectManyInfiniteScroll
          placeholder="Cobertura"
          initialOptions={initialFrostings}
          onChangedOptionsSelecteds={generateHandler(setFrosting)}
          newSelectedsOptions={frosting || []}
          {...paginatedSelectProps}
          onLoadMoreOptions={async (limit, page, search) => {
            const res = await getFrostingsWithErrorHandling(
              page,
              limit,
              search
            );

            return res.map(({ name }) => name);
          }}
        />

        <SelectManyInfiniteScroll
          placeholder="Recheio"
          initialOptions={initialFillings}
          onChangedOptionsSelecteds={generateHandler(setFilling)}
          newSelectedsOptions={filling || []}
          {...paginatedSelectProps}
          onLoadMoreOptions={async (limit, page, search) => {
            const res = await getFillingsWithErrorHandling(page, limit, search);

            return res.map(({ name }) => name);
          }}
        />

        <SelectMany
          placeholder="Tamanho"
          options={initialSizes}
          onChangedOptionsSelecteds={generateHandler(setSize)}
          newSelectedsOptions={size || []}
        />

        <SelectManyInfiniteScroll
          placeholder="Categoria"
          initialOptions={initialCategories}
          onChangedOptionsSelecteds={generateHandler(setCategory)}
          newSelectedsOptions={category || []}
          {...paginatedSelectProps}
          onLoadMoreOptions={async (limit, page, search) => {
            const res = await getCategoriesWithErrorHandling(
              page,
              limit,
              search
            );

            return res.map(({ category }) => category);
          }}
        />
      </div>
    </details>
  );
}

export default FilterSelects;
