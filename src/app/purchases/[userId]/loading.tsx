import OrderCardSkeleton from "./components/OrderCard/loading";
import styles from "@/styles/pages/Purchases.module.scss";

function PurchasesPageLoading() {
  return (
    <section className={styles.mainSection}>
      <div className={`${styles.wrapper} wrapper`}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <OrderCardSkeleton key={key} />
        ))}
      </div>
    </section>
  );
}

export default PurchasesPageLoading;
