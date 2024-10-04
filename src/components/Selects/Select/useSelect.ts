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

    if (isRequired && !selectedOption) {
      setSelectedOption(
        defaultValue && options.includes(defaultValue)
          ? defaultValue
          : optionsWithId[0].name
      );

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
