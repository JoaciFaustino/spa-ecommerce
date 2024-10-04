import { useEffect, useRef, useState, useTransition } from "react";

type OnLoadMoreOptions = (
  page: number,
  limit: number,
  search?: string
) => string[] | Promise<string[]>;

export const usePagination = (
  initialOptions: string[],
  initialPage: number,
  limit: number,
  userDisabledPagination: boolean,
  onLoadMoreOptions: OnLoadMoreOptions,
  usePaginationFunctionOnSearch: boolean = false
) => {
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [paginationIsDisabled, setPaginationIsDisabled] = useState(false);
  const lastRequestId = useRef(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    setOptions((prev) => [
      ...initialOptions.filter((option) => !prev.includes(option)),
      ...prev
    ]);
  }, [initialOptions]);

  const getMoreOptions = async () => {
    if (
      !onLoadMoreOptions ||
      isLoading ||
      paginationIsDisabled ||
      userDisabledPagination
    ) {
      return;
    }

    const currentRequestId = ++lastRequestId.current;

    startTransition(async () => {
      const moreOptions = await onLoadMoreOptions(
        currentPage,
        limit,
        search !== "" ? search : undefined
      );

      if (
        currentRequestId !== lastRequestId.current ||
        !moreOptions ||
        moreOptions.length === 0
      ) {
        return;
      }

      setOptions((prev) => [
        ...prev,
        ...moreOptions.filter((value) => !prev.includes(value))
      ]);
      setCurrentPage((prev) => prev + 1);
    });
  };

  const handleChangeSearch = (value: string) => {
    setSearch(value);
    const requestId = ++lastRequestId.current;

    if (!usePaginationFunctionOnSearch) {
      return;
    }

    startTransition(async () => {
      if (value === "") {
        setOptions(initialOptions);
        setCurrentPage(initialPage);

        return;
      }

      setOptions([]);
      setCurrentPage(2);
      setPaginationIsDisabled(true);

      const newOptions = await onLoadMoreOptions(1, limit, value);

      setPaginationIsDisabled(false);

      if (
        requestId !== lastRequestId.current ||
        !newOptions ||
        newOptions.length === 0
      ) {
        return;
      }

      setOptions(newOptions);
    });
  };

  return {
    options,
    getMoreOptions,
    isLoading,
    handleChangeSearch,
    search
  };
};
