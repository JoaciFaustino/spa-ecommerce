import OrderProductsListSkeleton from "@/components/OrderProductsList/loading";
import styles from "./OrderCard.module.scss";
import Text from "./_components/Text/Text";
import OrderHeader from "./_components/OrderHeader/OrderHeader";

function OrderCardSkeleton() {
  return (
    <div className={`${styles.orderCard}`}>
      <OrderHeader orderId="999999999999999999999999" loading />

      <div className={styles.cardContent}>
        <OrderProductsListSkeleton />

        <div className={`${styles.infoCol} ${styles.loading}`}>
          <h4>Informações do pedido</h4>

          <Text label="Tipo de recebimento" value="xxxxxxxx" loading />
          <Text
            label="Estado do pedido"
            value="xxxxxxxx"
            color="#00ff00"
            loading
          />
          <Text label="Data de entrega" value="88/88/8888 às 88:88" loading />
        </div>
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
