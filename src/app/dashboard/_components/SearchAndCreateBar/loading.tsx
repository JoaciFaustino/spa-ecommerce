import styles from "./SearchAndCreateBar.module.scss";

function SearchAndCreateBarLoading() {
  return (
    <div className={styles.searchAndCreateBar}>
      <span className={`${styles.selectLoading} loading text`}>J</span>

      <div>
        <span className={`${styles.selectLoading} loading text`}>J</span>
      </div>
    </div>
  );
}

export default SearchAndCreateBarLoading;
