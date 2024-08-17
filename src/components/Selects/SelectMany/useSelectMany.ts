import { Option } from "@/@types/SelectsComponents";
import { useModal } from "@/hooks/useModal";
import { ChangeEvent, useRef, useState } from "react";

export const useSelectMany = (
  optionsDefault: Option[],
  optionsSelecteds: string[],
  handleOptionsSelecteds: (newOptionsSelecteds: string[]) => void
) => {
  const [optionsNormalizeds, setOptionsNormalizeds] =
    useState<Option[]>(optionsDefault);
  const [inputValue, setInputValue] = useState("");
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const { handleIsOpen, modalIsOpen } = useModal(optionsRef);

  const openOptions = () => {
    if (inputValue === "") {
      sequenceOptions();
    }

    handleIsOpen(true);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    handleIsOpen(true);

    if (optionsSelecteds.includes(e.target.value)) {
      const newOptionsSelecteds = optionsSelecteds.filter(
        (option: string) => option !== e.target.value
      );
      handleOptionsSelecteds(newOptionsSelecteds);

      return;
    }

    const newOptionsSelecteds = [...optionsSelecteds, e.target.value];
    handleOptionsSelecteds(newOptionsSelecteds);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      sequenceOptions();
      return;
    }

    const filteredOptions = optionsDefault.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setOptionsNormalizeds([...filteredOptions]);
  };

  const sequenceOptions = () => {
    const selectedsOptionsFirst = optionsDefault.reduce(
      (sequencedOptions: Option[], option: Option) => {
        if (optionsSelecteds.includes(option.name)) {
          return [option, ...sequencedOptions];
        }

        return [...sequencedOptions, option];
      },
      []
    );

    setOptionsNormalizeds([...selectedsOptionsFirst]);
  };

  const clearOptionsSelecteds = () => {
    handleOptionsSelecteds([]);
  };

  return {
    handleChangeCheckbox,
    openOptions,
    inputValue,
    handleChangeSearch,
    optionsNormalizeds,
    optionsRef,
    modalIsOpen,
    clearOptionsSelecteds
  };
};
