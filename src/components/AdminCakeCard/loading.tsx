"use client";
import styles from "./AdminCakeCard.module.scss";

function AdminCakeCardLoading() {
  return (
    <div className={styles.card}>
      <div className={`${styles.imgSkeleton} loading`}></div>

      <div className={styles.textContent}>
        <h4 className={`loading`}>xxxxxxxxxxxxx</h4>

        <div className={styles.divCategories}>
          <p className={`loading text ${styles.category}`}>xxxxxxx</p>
          <p className={`loading text ${styles.category}`}>xxxxxxx</p>
        </div>

        <p className={`text loading`}>xxxxxxxxxxxxxxxxx</p>
        <p className={`text loading`}>xxxxxxxxxxxxxxxxx</p>
        <p className={`text loading`}>xxxxxxxxxxxxxxxxx</p>
        <p className={`text loading`}>xxxxxxxxxxxxxxxxx</p>
      </div>

      <div className={styles.actionButtons}>
        <span className={`${styles.iconSkeleton} loading`}></span>
        <span className={`${styles.iconSkeleton} loading`}></span>
      </div>
    </div>
  );
}

export default AdminCakeCardLoading;
