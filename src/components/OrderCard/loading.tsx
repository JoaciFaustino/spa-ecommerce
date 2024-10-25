import OrderProductsListSkeleton from "@/components/OrderProductsList/loading";
import styles from "./OrderCard.module.scss";
import { OrderInfoText } from "./OrderCard";

function OrderCardSkeleton() {
  return (
    <div className={`${styles.orderCard}`}>
      <header>
        <p className="text">
          Id do pedido <br />
          <span className={"loading"}>999999999999999999999999</span>
        </p>
      </header>

      <div className={styles.cardContent}>
        <OrderProductsListSkeleton />
        <div className={`${styles.orderInfo} ${styles.loading}`}>
          <h4>Informações do pedido</h4>

          <OrderInfoText label="Tipo de recebimento" value="xxxxxxxx" loading />
          <OrderInfoText
            label="Estado do pedido"
            value="xxxxxxxx"
            color="#00ff00"
            loading
          />
          <OrderInfoText
            label="Data de entrega"
            value="88/88/8888 às 88:88"
            loading
          />
        </div>
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
