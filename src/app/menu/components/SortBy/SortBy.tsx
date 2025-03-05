"use client";
import Select from "@/components/Selects/Select/Select";
import { useMenuQueryParams } from "@/hooks/useMenuQueryParams";
import { useEffect } from "react";

function SortBy() {
  const { sortBy, setSortBy } = useMenuQueryParams();
  const sortByOptions = [
    "popularidade",
    "preço: do maior para o menor",
    "preço: do menor para o maior",
    "novos"
  ];

  useEffect(() => getDefaultParam(), []);

  const handleOptionSelected = (newValue: string | undefined) => {
    if (newValue && sortByOptions.includes(newValue)) {
      setSortBy(newValue || sortBy);
    }
  };

  const getDefaultParam = () => {
    const queryParamIncludesInSortByOptions =
      !!sortBy && sortByOptions.includes(sortBy);

    if (queryParamIncludesInSortByOptions) {
      setSortBy(sortBy);

      return;
    }

    setSortBy("popularidade");
  };

  return (
    <>
      <label>Ordenar por:</label>

      <Select
        options={sortByOptions}
        defaultValue={sortBy || "popularidade"}
        onChangeOption={handleOptionSelected}
      />
    </>
  );
}

export default SortBy;
