import { BsPlusCircle } from "react-icons/bs";
import styles from "./SearchAndCreateBar.module.scss";

function SearchAndCreateBarLoading() {
  return (
    <div className={styles.searchAndCreateBar}>
      <span className={`${styles.selectLoading} loading text`}>
        Criar um novo
        <BsPlusCircle style={{ fontSize: "0.875rem", color: "transparent" }} />
      </span>

      <div>
        <span className={`${styles.selectLoading} loading text`}>
          placeholder
        </span>
      </div>
    </div>
  );
}

export default SearchAndCreateBarLoading;
