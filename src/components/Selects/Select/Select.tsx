"use client";
import styles from "../Select.module.scss";
import { useMemo } from "react";
import Button from "../components/Button";
import { useSelect } from "./useSelect";
import OptionSelect from "../components/OptionSelect";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import FinalOptionsInspector from "../components/FinalOptionsInspector";

type SelectProps = {
  options: string[];
  isRequired?: boolean;
  isDisabled?: boolean;
  nullOptionLabel?: string;
  defaultValue?: string;
  isLoadingOptions?: boolean;
  onEndOfOptionsReached?: () => void | Promise<void>;
  onChangeOption?: (newValue: string | undefined) => void;
};

function Select({
  options = [],
  isRequired = true,
  isDisabled = false,
  nullOptionLabel = "None",
  defaultValue,
  isLoadingOptions = false,
  onEndOfOptionsReached,
  onChangeOption
}: SelectProps) {
  const {
    optionsIsOpen,
    optionsWithId,
    selectedOption,
    toggleOptions,
    handleChangeOption,
    optionsRef,
    isMounted
  } = useSelect(options, isRequired, defaultValue, onChangeOption);
  const nameSelect = useMemo(() => String(Date.now() + Math.random()), []);
  const autoIsDisabled = isDisabled || !isMounted;

  const finalOptionsEventIsDisabled = !onEndOfOptionsReached || !optionsIsOpen;
  const { finalPageInspectorRef } = useInfiniteScroll(
    onEndOfOptionsReached,
    undefined,
    finalOptionsEventIsDisabled
  );

  return (
    <div
      className={`${styles.select} ${autoIsDisabled ? styles.disabled : ""}`}
    >
      <Button
        isDisabled={autoIsDisabled}
        optionsIsOpen={optionsIsOpen}
        textContent={selectedOption || nullOptionLabel}
        toogleOptions={toggleOptions}
      />

      {optionsIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {!isRequired && (
            <OptionSelect
              isNullOption
              type="radio"
              name={nameSelect}
              isSelected={!selectedOption}
              handleChangeOption={handleChangeOption}
              optionName={nullOptionLabel}
            />
          )}

          {optionsWithId.map((option) => (
            <OptionSelect
              key={option.id}
              type="radio"
              name={nameSelect}
              handleChangeOption={handleChangeOption}
              isSelected={selectedOption === option.name}
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

export default Select;
