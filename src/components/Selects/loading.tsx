import styles from "./Select.module.scss";

function SelectSkeleton({ label }: { label?: string }) {
  return (
    <div className={styles.select}>
      {!!label && <label>{label}</label>}

      <span className={`${styles.selectLoading} loading text`}>J</span>
    </div>
  );
}

export default SelectSkeleton;
