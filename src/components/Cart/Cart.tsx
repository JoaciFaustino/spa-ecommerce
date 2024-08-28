"use client";
import { CgShoppingCart } from "react-icons/cg";
import styles from "./Cart.module.scss";
import { useRef } from "react";
import { Cart as CartType } from "@/@types/Cart";
import { useModal } from "@/hooks/useModal";
import ItemCart from "./ItemCart/ItemCart";
import { useCart } from "./useCart";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function Cart({ cart }: { cart: CartType | undefined }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { toggleModal, modalIsOpen } = useModal(modalRef);
  const { cakes, totalPriceCart, handleClearCart, clearCartIsPending } =
    useCart(cart?._id, cart?.cakes);
  const cakeQuantity =
    cakes?.reduce((acm, { quantity }) => acm + quantity, 0) || 0;

  return (
    <div className={styles.divCart}>
      <CgShoppingCart
        style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        onClick={toggleModal}
      />

      {cart && cakeQuantity > 0 && (
        <span className={styles.qntItemsCart}>{cakeQuantity}</span>
      )}

      {modalIsOpen && (
        <div className={styles.cartModal} ref={modalRef}>
          <div className={styles.divItemCakes}>
            {!cart && (
              <p className={`text ${styles.textWarning}`}>
                Não foi possível mostrar os seus itens no carrinho. Tente
                novamente mais tarde
              </p>
            )}

            {cart && cakeQuantity === 0 && (
              <p className={`text ${styles.textWarning}`}>
                Seu carrinho está vazio!
              </p>
            )}

            {cart && cart._id && cakeQuantity > 0 && (
              <>
                {cakes?.map((cake) => (
                  <ItemCart key={cake._id} cake={cake} />
                ))}
              </>
            )}
          </div>

          <footer className={styles.cartFooter}>
            <h4>
              Total: <span className={styles.priceText}>{totalPriceCart}</span>
            </h4>

            <div className={styles.divBtns}>
              <button
                className={styles.cleanCartBtn}
                disabled={cakeQuantity === 0 || clearCartIsPending}
                onClick={handleClearCart}
              >
                {!clearCartIsPending && "Limpar tudo"}
                {clearCartIsPending && (
                  <SpinnerLoader
                    color="var(--primary-color)"
                    size={1}
                    unitSize="rem"
                  />
                )}
              </button>
              <button
                className={styles.completePurchaseBtn}
                disabled={cakeQuantity === 0}
              >
                Finalizar compra
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Cart;
