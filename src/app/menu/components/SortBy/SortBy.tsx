"use client";

import { Option } from "@/@types/SelectsComponents";
import Select from "@/components/Selects/Select/Select";
import { useMenuQueryParams } from "@/hooks/useMenuQueryParams";
import { useEffect } from "react";

function SortBy() {
  const { sortBy, setSortBy } = useMenuQueryParams();
  const sortByOptions: Option[] = [
    "popularidade",
    "preço: do maior para o menor",
    "preço: do menor para o maior",
    "novos"
  ].map((value, index) => ({ id: index, name: value }));

  useEffect(() => {
    getDefaultParam();
  }, []);

  const handleOptionSelected = (newValue: string) => {
    setSortBy(newValue);
  };

  const getDefaultParam = () => {
    const queryParamIncludesInSortByOptions = sortByOptions.some(
      (option) => sortBy === option.name
    );

    if (sortBy && queryParamIncludesInSortByOptions) {
      setSortBy(sortBy);

      return;
    }

    setSortBy("popularidade");
  };

  return (
    <Select
      selectName="sortBy"
      label="Ordenar por:"
      options={sortByOptions}
      optionSelected={sortBy || "popularidade"}
      handleOptionSelected={handleOptionSelected}
    />
  );
}

export default SortBy;
