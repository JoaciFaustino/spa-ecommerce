export type SelectInfiniteScollBaseProps = {
  initialOptions: string[];
  initialPage: number;
  limit: number;
  usePaginationFunctionOnSearch?: boolean;
  paginationIsDisabled?: boolean;
  onLoadMoreOptions: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<string[]> | string[];
};

export type Option = {
  id: string | number;
  name: string;
};
