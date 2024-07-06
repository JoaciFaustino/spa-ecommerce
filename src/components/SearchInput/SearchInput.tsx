import { BsSearch } from "react-icons/bs";
import styles from "./SearchInput.module.scss";

function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className={styles.divSearch}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        className={`text`}
      />

      <BsSearch
        className={styles.searchIcon}
        style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
      />
    </div>
  );
}

export default SearchInput;
