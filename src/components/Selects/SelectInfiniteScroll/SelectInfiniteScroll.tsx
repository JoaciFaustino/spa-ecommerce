"use client";
import { SelectInfiniteScollBaseProps } from "@/@types/SelectsComponents";
import Select from "../Select/Select";
import { usePagination } from "../usePagination";

type SelectInfiniteScollProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  nullOptionLabel?: string;
  defaultValue?: string;
  onChangeOption?: (newValue: string | undefined) => void;
} & Omit<SelectInfiniteScollBaseProps, "usePaginationFunctionOnSearch">;

function SelectInfiniteScoll({
  initialOptions,
  initialPage,
  limit,
  paginationIsDisabled = false,
  onLoadMoreOptions,
  ...SelectDefaultProps
}: SelectInfiniteScollProps) {
  const { isLoading, getMoreOptions, options } = usePagination(
    initialOptions,
    initialPage,
    limit,
    paginationIsDisabled,
    onLoadMoreOptions
  );

  return (
    <Select
      options={options}
      isLoadingOptions={isLoading}
      onEndOfOptionsReached={getMoreOptions}
      {...SelectDefaultProps}
    />
  );
}

export default SelectInfiniteScoll;
