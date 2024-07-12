import { parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useSelect = (options: string[], queryParam?: string) => {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [optionSelected, setOptionSelected] = useState(options[0]);

  const [queryParamState, setQueryParamState] = useQueryState(
    queryParam || "",
    parseAsString.withOptions({
      clearOnDefault: true,
      shallow: false
      // throttleMs: 1000
    })
  );

  useEffect(() => {
    getDefaultParam(options, queryParam);

    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  const getDefaultParam = (options: string[], queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    if (queryParamState && options.includes(queryParamState)) {
      setOptionSelected(queryParamState);

      return;
    }

    setQueryParamState(options[0]);
  };

  const handleClickOutsideModal: EventListener = (event) => {
    if (
      // optionsIsOpen &&
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setOptionsIsOpen(false);
    }
  };

  const handleClickButton = () => {
    setOptionsIsOpen((prev) => !prev);
  };

  const handleChangeInputOption = (e: ChangeEvent<HTMLInputElement>) => {
    setOptionSelected(e.target.value);
    setOptionsIsOpen(false);

    if (!queryParam) {
      return;
    }

    setQueryParamState(e.target.value);
  };

  return {
    optionsIsOpen,
    optionsRef,
    optionSelected,
    handleClickButton,
    handleChangeInputOption
  };
};
