import styles from "./CakePartsCard.module.scss";

function CakePartsCardSkeleton() {
  return (
    <div className={styles.card}>
      <h5 className={`loading`}>xxxxxxxxxx</h5>

      <div className={styles.actionButtons}>
        <span className={`${styles.iconSkeleton} loading`}></span>
        <span className={`${styles.iconSkeleton} loading`}></span>
      </div>
    </div>
  );
}

export default CakePartsCardSkeleton;
