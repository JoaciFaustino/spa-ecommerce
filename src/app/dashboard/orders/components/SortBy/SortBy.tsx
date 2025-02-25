"use client";
import styles from "./SortBy.module.scss";
import Select from "@/components/Selects/Select/Select";
import { useEffect } from "react";
import { useOrderDashboardFilters } from "@/hooks/useOrderDashboardFilters";
import {
  ORDERS_SORT_BY_OPTIONS_TRANSLATE,
  OrdersSortByTranslate
} from "@/@types/OrdersFilters";

const sortByOptions = [...ORDERS_SORT_BY_OPTIONS_TRANSLATE];
const defaultSortBy: OrdersSortByTranslate = "mais novos";

function SortBy() {
  const { sortBy, setSortBy } = useOrderDashboardFilters();

  useEffect(() => getDefaultParam(), []);

  const handleOptionSelected = (newValue: string | undefined) => {
    const newValueIsValid = !!sortByOptions.find(
      (option) => newValue === option
    );

    if (!newValueIsValid) {
      return;
    }

    setSortBy(newValue || sortBy);
  };

  const getDefaultParam = () => {
    const queryParamIncludesInSortByOptions =
      !!sortBy && sortByOptions.includes(sortBy as OrdersSortByTranslate);

    if (queryParamIncludesInSortByOptions) {
      setSortBy(sortBy);

      return;
    }

    setSortBy(defaultSortBy);
  };

  return (
    <div className={styles.sortBy}>
      <label>Ordenar por:</label>

      <Select
        options={sortByOptions}
        defaultValue={defaultSortBy}
        onChangeOption={handleOptionSelected}
        isRequired
      />
    </div>
  );
}

export default SortBy;
