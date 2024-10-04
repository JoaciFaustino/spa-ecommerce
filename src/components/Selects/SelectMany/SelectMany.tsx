"use client";
import styles from "../Select.module.scss";
import { useSelectMany } from "./useSelectMany";
import { useMemo } from "react";
import InputSelectMany from "../components/InputSelectMany";
import OptionSelect from "../components/OptionSelect";
import FinalOptionsInspector from "../components/FinalOptionsInspector";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export type SelectManyProps = {
  options: string[];
  isLoadingOptions?: boolean;
  placeholder: string;
  isDisabled?: boolean;
  newSelectedsOptions?: string[];
  searchDebounceTime?: number;
  onChangedOptionsSelecteds?: (newOptionsSelecteds: string[]) => void;
  onEndOfOptionsReached?: () => void | Promise<void>;
  onChangeSearch?: (value: string) => void | Promise<void>;
};

function SelectMany({
  placeholder,
  options = [],
  isDisabled,
  newSelectedsOptions = [],
  isLoadingOptions = false,
  searchDebounceTime = 0,
  onChangedOptionsSelecteds,
  onEndOfOptionsReached,
  onChangeSearch
}: SelectManyProps) {
  const {
    handleChangeCheckbox,
    handleChangeSearch,
    clearOptionsSelecteds,
    openOptions,
    filteredOptions,
    inputValue,
    optionsIsOpen,
    optionsSelecteds,
    isMounted,
    optionsRef
  } = useSelectMany(
    options,
    newSelectedsOptions,
    searchDebounceTime,
    onChangedOptionsSelecteds,
    onChangeSearch
  );

  const autoIsDisabled = isDisabled || !isMounted;
  const nameSelect = useMemo(() => String(Date.now() + Math.random()), []);

  const finalOptionsEventIsDisabled = !onEndOfOptionsReached || !optionsIsOpen;
  const { finalPageInspectorRef } = useInfiniteScroll(
    onEndOfOptionsReached,
    undefined, //, "100px"
    finalOptionsEventIsDisabled
  );

  return (
    <div
      className={`${autoIsDisabled ? styles.disabled : ""} ${styles.select}`}
    >
      <InputSelectMany
        clearOptionsSelecteds={clearOptionsSelecteds}
        handleChangeSearch={handleChangeSearch}
        inputValue={inputValue}
        isMounted={isMounted}
        openOptions={openOptions}
        optionsIsOpen={optionsIsOpen}
        optionsSelecteds={optionsSelecteds}
        placeholder={placeholder}
      />

      {optionsIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {
            //prettier-ignore
            inputValue !== "" &&
            filteredOptions.length === 0 &&
            !isLoadingOptions && (
              <p className={`${styles.textWarning} text`}>
                Não existe essa opção
              </p>
            )
          }

          {filteredOptions.map((option) => (
            <OptionSelect
              key={option.id}
              type="checkbox"
              name={nameSelect}
              disabled={autoIsDisabled}
              handleChangeOption={handleChangeCheckbox}
              isSelected={optionsSelecteds.includes(option.name)}
              optionName={option.name}
            />
          ))}

          <FinalOptionsInspector
            isLoading={isLoadingOptions}
            ref={finalPageInspectorRef}
          />
        </div>
      )}
    </div>
  );
}

export default SelectMany;
