import styles from "./CakeCard.module.scss";

function CakeCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.divImg}>
        <span className={`loading ${styles.imgSkeleton}`}></span>
      </div>
      <div className={styles.divText}>
        <div className={styles.divTypeCake}>
          <p className={`textBig loading ${styles.nameCakeSkeleton}`}></p>
        </div>
        <h4 className={`textBig loading ${styles.priceSkeleton}`}></h4>
      </div>
    </div>
  );
}

export default CakeCardSkeleton;
