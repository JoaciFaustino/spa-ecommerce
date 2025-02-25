"use client";
import styles from "./Filter.module.scss";
import SelectMany from "@/components/Selects/SelectMany/SelectMany";
import {
  ORDERS_FILTERS_OPTIONS_TRANSLATE,
  OrdersFiltersOptionsTranslate as FilterOption
} from "@/@types/OrdersFilters";
import { useOrderDashboardFilters } from "@/hooks/useOrderDashboardFilters";
import { useEffect } from "react";

const filtersOptions = [...ORDERS_FILTERS_OPTIONS_TRANSLATE];

function Filter() {
  const { filters, setFilters } = useOrderDashboardFilters();

  useEffect(() => getDefaultParam(), []);

  const handleOptionSelecteds = (newOptionsSelecteds: string[]) => {
    const validsValues = newOptionsSelecteds.filter((optionSelected) =>
      filtersOptions.includes(optionSelected as FilterOption)
    );

    setFilters(validsValues.length > 0 ? validsValues : null);
  };

  const getDefaultParam = () => {
    const validsValues =
      filters?.filter((optionSelected) =>
        filtersOptions.includes(optionSelected as FilterOption)
      ) || null;

    setFilters(validsValues);
  };

  return (
    <div className={styles.filter}>
      <label>Filtros:</label>

      <SelectMany
        options={filtersOptions}
        placeholder="Filtros"
        onChangedOptionsSelecteds={handleOptionSelecteds}
      />
    </div>
  );
}

export default Filter;
