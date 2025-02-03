"use client";
import SelectManyTags from "../SelectManyTags/SelectManyTags";
import { SelectInfiniteScollBaseProps } from "@/@types/SelectsComponents";
import { usePagination } from "../usePagination";

type SelectManyInfiniteScrollProps = {
  isDisabled?: boolean;
  newSelectedsOptions?: string[];
  onChangedOptionsSelecteds?: (newOptionsSelecteds: string[]) => void;
  noOneOptionSelectedsMessage?: string;
} & Omit<SelectInfiniteScollBaseProps, "usePaginationFunctionOnSearch">;

function SelectManyTagsInfiniteScroll({
  initialOptions,
  initialPage,
  limit,
  paginationIsDisabled = false,
  onLoadMoreOptions,
  ...selectManyDefaultProps
}: SelectManyInfiniteScrollProps) {
  const { options, getMoreOptions, isLoading } = usePagination(
    initialOptions,
    initialPage,
    limit,
    paginationIsDisabled,
    onLoadMoreOptions
  );

  return (
    <SelectManyTags
      options={options}
      isLoadingOptions={isLoading}
      onEndOfOptionsReached={getMoreOptions}
      {...selectManyDefaultProps}
    />
  );
}

export default SelectManyTagsInfiniteScroll;
