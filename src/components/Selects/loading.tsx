import styles from "./Select.module.scss";

function SelectLoading({ label }: { label?: string }) {
  return (
    <div className={styles.select}>
      {label && <label>{label}</label>}
      <div className={`loading ${styles.selectLoading}`}>
        <p className={`loading text`}></p>
      </div>
    </div>
  );
}

export default SelectLoading;
