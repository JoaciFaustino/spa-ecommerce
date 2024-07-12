import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useSelectMany = (
  optionsDefault: string[],
  queryParam?: string
) => {
  const [optionsSelecteds, setOptionsSelecteds] = useState<string[]>([]);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>(optionsDefault);

  const [queryParamState, setQueryParamState] = useQueryState(
    queryParam || "",
    parseAsArrayOf(parseAsString).withOptions({
      clearOnDefault: true,
      shallow: false
      // throttleMs: 1000
    })
  );

  useEffect(() => {
    getDefaultParams(queryParam);

    document.addEventListener("mousedown", handleClickOutsideOptions);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOptions);
    };
  }, []);

  const handleClickOutsideOptions: EventListener = (event) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setOptionsIsOpen(false);
    }
  };

  const openOptions = () => {
    if (inputValue === "") {
      sequenceOptions();
    }

    setOptionsIsOpen(true);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setOptionsIsOpen(true);

    if (!optionsSelecteds.includes(e.target.value)) {
      setOptionsSelecteds((prev) => {
        return [...prev, e.target.value];
      });

      setQueryParamStateValue(e.target.value, queryParam);

      return;
    }

    setOptionsSelecteds((prev) => {
      return prev.filter((option) => option !== e.target.value);
    });

    removeQueryParamValue(e.target.value, queryParam);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      sequenceOptions();

      return;
    }

    const filteredOptions = optionsDefault.filter((option) =>
      option.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setOptions([...filteredOptions]);
  };

  const sequenceOptions = () => {
    const selectedsOptionsFirst: string[] = optionsDefault.reduce(
      (sequencedOptions: string[], option: string) => {
        if (optionsSelecteds.includes(option)) {
          return [option, ...sequencedOptions];
        }

        return [...sequencedOptions, option];
      },
      []
    );

    setOptions([...selectedsOptionsFirst]);
  };

  const clearOptionsSelecteds = () => {
    setOptionsSelecteds([]);

    if (!queryParam) {
      return;
    }

    setQueryParamState(null);
  };

  const getDefaultParams = (queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    setOptionsSelecteds((prev) => [
      ...prev,
      ...(queryParamState || []).filter((value) =>
        optionsDefault.includes(value)
      )
    ]);
  };

  const setQueryParamStateValue = (value: string, queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    setQueryParamState((prev) => [...(prev || []), value]);
  };

  const removeQueryParamValue = (value: string, queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    setQueryParamState((prev) => {
      const arrayWitValueDeleted = (prev || []).filter(
        (valuePrev) => valuePrev !== value
      );

      return arrayWitValueDeleted.length !== 0 ? arrayWitValueDeleted : null;
    });
  };

  return {
    optionsIsOpen,
    handleChangeCheckbox,
    optionsRef,
    optionsSelecteds,
    openOptions,
    inputValue,
    handleChangeSearch,
    options,
    clearOptionsSelecteds
  };
};
