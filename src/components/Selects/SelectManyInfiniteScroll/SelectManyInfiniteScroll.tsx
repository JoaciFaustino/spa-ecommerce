"use client";
import SelectMany from "../SelectMany/SelectMany";
import { SelectInfiniteScollBaseProps } from "@/@types/SelectsComponents";
import { usePagination } from "../usePagination";

type SelectManyInfiniteScrollProps = {
  placeholder: string;
  isDisabled?: boolean;
  newSelectedsOptions?: string[];
  onChangedOptionsSelecteds?: (newOptionsSelecteds: string[]) => void;
  searchDebounceTime?: number;
} & SelectInfiniteScollBaseProps;

function SelectManyInfiniteScroll({
  initialOptions,
  initialPage,
  limit,
  paginationIsDisabled = false,
  usePaginationFunctionOnSearch = false,
  onLoadMoreOptions,
  ...selectManyDefaultProps
}: SelectManyInfiniteScrollProps) {
  const { options, getMoreOptions, isLoading, handleChangeSearch, search } =
    usePagination(
      initialOptions,
      initialPage,
      limit,
      paginationIsDisabled,
      onLoadMoreOptions,
      usePaginationFunctionOnSearch
    );

  const canUseHandleEndOfOptionsReached =
    (!usePaginationFunctionOnSearch && search === "") ||
    usePaginationFunctionOnSearch;

  return (
    <SelectMany
      options={options}
      isLoadingOptions={isLoading}
      onChangeSearch={handleChangeSearch}
      onEndOfOptionsReached={
        canUseHandleEndOfOptionsReached ? getMoreOptions : undefined
      }
      {...selectManyDefaultProps}
    />
  );
}

export default SelectManyInfiniteScroll;
