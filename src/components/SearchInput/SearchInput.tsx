"use client";
import { BsSearch } from "react-icons/bs";
import styles from "./SearchInput.module.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { parseAsString, useQueryState } from "nuqs";

function SearchInput({ placeholder }: { placeholder: string }) {
  const [searchParam, setSearchParam] = useQueryState(
    "search",
    parseAsString.withOptions({ clearOnDefault: true, shallow: false })
  );
  const [value, setValue] = useState(searchParam || "");
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => {
    setSearchParam(debouncedValue || null);
  }, [debouncedValue]);

  return (
    <div className={styles.divSearch}>
      <input
        type="text"
        name="search"
        value={value}
        placeholder={placeholder}
        className={`text`}
        onChange={(e) => setValue(e.target.value)}
      />

      <BsSearch
        className={styles.searchIcon}
        style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
      />
    </div>
  );
}

export default SearchInput;
