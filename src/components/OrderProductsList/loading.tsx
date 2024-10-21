import styles from "./OrderProductsList.module.scss";

function OrderProductsListSkeleton() {
  return (
    <section className={`${styles.mainSection} loading`}>
      <div className={`${styles.info} loading`}>
        <p className={`loading`}>X produtos</p>

        <h3 className={`loading`}>Total:</h3>
      </div>

      <h3 className={`loading`}>Produtos</h3>
    </section>
  );
}
export default OrderProductsListSkeleton;
