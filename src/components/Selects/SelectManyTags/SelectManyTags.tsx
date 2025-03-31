import { Fragment, useMemo } from "react";
import { useSelectMany } from "../SelectMany/useSelectMany";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import styles from "../Select.module.scss";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import OptionSelect from "../components/OptionSelect";
import FinalOptionsInspector from "../components/FinalOptionsInspector";
import { BsPlus } from "react-icons/bs";

export type SelectManyTagsProps = {
  options: string[];
  isLoadingOptions?: boolean;
  isDisabled?: boolean;
  newSelectedsOptions?: string[];
  onChangedOptionsSelecteds?: (newOptionsSelecteds: string[]) => void;
  onEndOfOptionsReached?: () => void | Promise<void>;
  noOneOptionSelectedsMessage?: string;
};

function SelectManyTags({
  options = [],
  isDisabled,
  newSelectedsOptions = [],
  isLoadingOptions = false,
  onChangedOptionsSelecteds,
  onEndOfOptionsReached,
  noOneOptionSelectedsMessage
}: SelectManyTagsProps) {
  const {
    handleChangeCheckbox,
    openOptions,
    filteredOptions,
    deselectOption,
    optionsIsOpen,
    optionsSelecteds,
    isMounted,
    optionsRef
  } = useSelectMany(options, newSelectedsOptions, 0, onChangedOptionsSelecteds);

  const autoIsDisabled = isDisabled || !isMounted;
  const nameSelect = useMemo(() => String(Date.now() + Math.random()), []);

  const finalOptionsEventIsDisabled = !onEndOfOptionsReached || !optionsIsOpen;
  const { finalPageInspectorRef } = useInfiniteScroll(
    onEndOfOptionsReached,
    undefined,
    finalOptionsEventIsDisabled
  );

  return (
    <div
      className={`${styles.select} ${styles.selectTags} ${
        autoIsDisabled ? styles.disabled : ""
      }`}
    >
      <div className={styles.divTags}>
        <button
          className={styles.btnOpenTagsOptions}
          onClick={openOptions}
          type="button"
          disabled={isDisabled}
        >
          <BsPlus style={{ color: "#fff", fontSize: "1.5rem" }} />

          <IoIosArrowDown
            className={`${styles.icon} ${optionsIsOpen ? styles.rotated : ""}`}
            style={{ color: "#fff", fontSize: "1rem" }}
          />
        </button>

        {optionsSelecteds.length === 0 && (
          <p className="text">
            {noOneOptionSelectedsMessage || "No one option selected."}
          </p>
        )}

        {optionsSelecteds.map((optionSelected) => (
          <div key={optionSelected} className={styles.tag}>
            {optionSelected}

            <IoIosClose
              onClick={() => deselectOption(optionSelected)}
              className={styles.icon}
              style={{ color: "var(--color-text-title)", fontSize: "1.5rem" }}
            />
          </div>
        ))}
      </div>

      {optionsIsOpen && (
        <div className={styles.divOptions} ref={optionsRef}>
          {filteredOptions.map((option) => (
            <Fragment key={option.id}>
              {!optionsSelecteds.includes(option.name) && (
                <OptionSelect
                  type="checkbox"
                  name={nameSelect}
                  disabled={autoIsDisabled}
                  handleChangeOption={handleChangeCheckbox}
                  isSelected={false}
                  optionName={option.name}
                />
              )}
            </Fragment>
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

export default SelectManyTags;
