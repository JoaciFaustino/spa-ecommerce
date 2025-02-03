import { Option } from "@/@types/SelectsComponents";
import { useModal } from "@/hooks/useModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { createOptions } from "@/utils/selectComponents";

export const useSelect = (
  options: string[],
  isRequired: boolean,
  defaultValue?: string | undefined,
  onChangeOption?: (newValue: string | undefined) => void
) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [optionsWithId, setOptionsWithId] = useState<Option[]>(
    createOptions(options)
  );
  const [selectedOption, setSelectedOption] = useState(
    isRequired && !defaultValue ? optionsWithId[0]?.name : defaultValue
  );
  const { toggleModal: toggleOptions, modalIsOpen: optionsIsOpen } =
    useModal(optionsRef);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    setOptionsWithId(createOptions(options));

    if (isRequired && !defaultValue) {
      setSelectedOption(optionsWithId[0]?.name);

      if (onChangeOption) {
        onChangeOption(optionsWithId[0]?.name);
      }
    }

    if (isRequired && !selectedOption) {
      const normalizedDefaultOption =
        defaultValue && options.includes(defaultValue)
          ? defaultValue
          : optionsWithId[0].name;

      setSelectedOption(normalizedDefaultOption);

      if (onChangeOption) {
        onChangeOption(normalizedDefaultOption);
      }

      return;
    }
  }, [options]);

  const handleChangeOption = (e: ChangeEvent<HTMLInputElement>) => {
    const changedOption =
      !isRequired && e.target.value === "" ? undefined : e.target.value;

    setSelectedOption(changedOption);

    if (onChangeOption) {
      onChangeOption(changedOption);
    }
  };

  return {
    optionsWithId,
    handleChangeOption,
    selectedOption,
    toggleOptions,
    optionsIsOpen,
    optionsRef,
    isMounted
  };
};
