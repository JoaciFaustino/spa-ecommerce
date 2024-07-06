import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

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

      setQueryParamValue(e.target.value, queryParam);

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

    params.delete(queryParam);

    replace(`${pathname}?${params.toString()}`);
  };

  const getDefaultParams = (queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    const allValues = params.getAll(queryParam);

    setOptionsSelecteds(
      allValues.filter((value) => optionsDefault.includes(value))
    );
  };

  const setQueryParamValue = (value: string, queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    params.append(queryParam, value);

    replace(`${pathname}?${params.toString()}`);
  };

  const removeQueryParamValue = (value: string, queryParam?: string) => {
    if (!queryParam) {
      return;
    }

    params.delete(queryParam, value);

    replace(`${pathname}?${params.toString()}`);
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
