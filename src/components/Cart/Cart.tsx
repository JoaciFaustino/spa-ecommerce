import { CgShoppingCart } from "react-icons/cg";
import styles from "./Cart.module.scss";
import { useState } from "react";

function Cart() {
  const [qntItemsCart, setQntItemsCart] = useState(999);

  return (
    <div className={styles.divCart}>
      <CgShoppingCart
        style={{
          color: "var(--color-text-title)",
          fontSize: "1rem"
        }}
      />
      <div className={styles.qntItemsCart}>
        {qntItemsCart > 0 && <span>{qntItemsCart}</span>}
      </div>
    </div>
  );
}

export default Cart;
