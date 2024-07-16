import { Option } from "@/@types/SelectsComponents";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";

export const useSelectMany = (
  optionsDefault: Option[],
  queryParam?: string
) => {
  const [optionsSelecteds, setOptionsSelecteds] = useState<string[]>([]);
  const [optionsNormalizeds, setOptionsNormalizeds] =
    useState<Option[]>(optionsDefault);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");

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
      return prev.filter((option: string) => option !== e.target.value);
    });

    removeQueryParamValue(e.target.value, queryParam);
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

    const urlOptionsIncludedsInOptionsDefault: string[] = optionsDefault.reduce(
      (acm: string[], option: Option) => {
        if ((queryParamState || []).includes(option.name)) {
          return [...acm, option.name];
        }

        return [...acm];
      },
      []
    );

    setOptionsSelecteds((prev) => [
      ...prev,
      ...urlOptionsIncludedsInOptionsDefault
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
    optionsNormalizeds,
    clearOptionsSelecteds
  };
};
