import { Option } from "@/@types/SelectsComponents";
import { createOptions } from "@/utils/selectComponents";
import { useModal } from "@/hooks/useModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export const useSelectMany = (
  options: string[],
  newSelectedsOptions: string[],
  searchDebounceTime: number,
  onChangedOptionsSelecteds?: (newOptionsSelecteds: string[]) => void,
  onChangeSearch?: (value: string) => void | Promise<void>
) => {
  const [optionsWithId, setOptionsWithId] = useState(createOptions(options));
  const [filteredOptions, setFilteredOptions] = useState(optionsWithId);
  const [optionsSelecteds, setOptionsSelecteds] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const searchDebounced = useDebounce(inputValue, searchDebounceTime);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { handleIsOpen: handleOpenOptions, modalIsOpen: optionsIsOpen } =
    useModal(optionsRef);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    setOptionsWithId(createOptions(options));
  }, [JSON.stringify(options)]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    sequenceOptions();
  }, [JSON.stringify(optionsWithId)]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    filterOptions(searchDebounced);
  }, [searchDebounced]);

  useEffect(() => {
    const newSelectedsOptionsValids = Array.from(
      new Set(newSelectedsOptions.filter((option) => options.includes(option)))
    );

    changeOptionsSelecteds(newSelectedsOptionsValids);
  }, [JSON.stringify(newSelectedsOptions)]);

  const openOptions = () => {
    if (inputValue === "") {
      sequenceOptions();
    }

    handleOpenOptions(true);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    handleOpenOptions(true);

    if (optionsSelecteds.includes(e.target.value)) {
      deselectOption(e.target.value);

      return;
    }

    selectOption(e.target.value);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filterOptions = async (search: string) => {
    if (onChangeSearch) {
      await onChangeSearch(search);
    }

    if (search === "") {
      sequenceOptions();
      return;
    }

    const filteredOptions = optionsWithId.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredOptions(filteredOptions);
  };

  const sequenceOptions = () => {
    const selectedsOptionsWithId: Option[] = [];
    const nonSelectedsOptions: Option[] = [];

    for (const option of optionsWithId) {
      if (optionsSelecteds.includes(option.name)) {
        selectedsOptionsWithId.push(option);
      } else {
        nonSelectedsOptions.push(option);
      }
    }

    setFilteredOptions([...selectedsOptionsWithId, ...nonSelectedsOptions]);
  };

  const changeOptionsSelecteds = (newOptionsSelecteds: string[]) => {
    setOptionsSelecteds(newOptionsSelecteds);

    if (onChangedOptionsSelecteds) {
      onChangedOptionsSelecteds(newOptionsSelecteds);
    }
  };

  const deselectOption = (optionToRemove: string) => {
    changeOptionsSelecteds(
      optionsSelecteds.filter((option: string) => option !== optionToRemove)
    );
  };

  const selectOption = (optionToSelect: string) =>
    changeOptionsSelecteds([...optionsSelecteds, optionToSelect]);

  const clearOptionsSelecteds = () => changeOptionsSelecteds([]);

  return {
    isMounted,
    handleChangeCheckbox,
    openOptions,
    optionsSelecteds,
    inputValue,
    handleChangeSearch,
    filteredOptions,
    optionsRef,
    optionsIsOpen,
    clearOptionsSelecteds
  };
};
