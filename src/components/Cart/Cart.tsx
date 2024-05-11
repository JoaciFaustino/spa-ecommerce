import { CgShoppingCart } from "react-icons/cg";
import styles from "./Cart.module.scss";

function Cart() {
  return (
    <div className={styles.divCart}>
      <CgShoppingCart
        style={{
          color: "var(--color-text-paragraph)",
          fontSize: "1rem"
        }}
      />
      <div className={styles.qntItemsCart}>
        {qntItemsCart > 0 && <span>{qntItemsCart}</span>}
      </div>
    </div>
  );
}
