import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useSelect = (options: string[], queryParam?: string) => {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [optionSelected, setOptionSelected] = useState(options[0]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

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

    const params = new URLSearchParams(searchParams);

    const param = params.get(queryParam);

    if (param && options.includes(param)) {
      setOptionSelected(param);
      return;
    }

    params.set(queryParam, options[0]);
    setOptionSelected(options[0]);

    replace(`${pathName}?${params.toString()}`);
  };

  const setQueryParam = (value: string) => {
    if (!queryParam) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    params.set(queryParam, value);

    replace(`${pathName}?${params.toString()}`);
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

    setQueryParam(e.target.value);
  };

  return {
    optionsIsOpen,
    optionsRef,
    optionSelected,
    handleClickButton,
    handleChangeInputOption
  };
};
