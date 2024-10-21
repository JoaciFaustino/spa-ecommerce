import OrderProductsListSkeleton from "@/components/OrderProductsList/loading";
import styles from "./OrderCard.module.scss";

function OrderCardSkeleton() {
  return (
    <div className={`${styles.orderCard} loading`}>
      <header style={{ border: "transparent 2px solid" }}>
        <p className="text loading">
          x <br />x
        </p>
      </header>

      <div className={styles.cardContent}>
        <OrderProductsListSkeleton />
        <div className={`${styles.orderInfo} ${styles.loading}`}>
          <h4 className={`loading`}>x</h4>

          <p className={`text loading`}>x</p>
          <p className={`text loading`}>x</p>
          <p className={`text loading`}>x</p>
        </div>
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
