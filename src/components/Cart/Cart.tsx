"use client";
import { CgShoppingCart } from "react-icons/cg";
import styles from "./Cart.module.scss";
import { useRef } from "react";
import { Cart as CartType } from "@/@types/Cart";
import { useModal } from "@/hooks/useModal";
import ItemCart from "./ItemCart/ItemCart";
import { useCart } from "./useCart";

function Cart({ cart }: { cart: CartType | undefined }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { handleOpenAndCloseModal, modalIsOpen } = useModal(modalRef);
  const { allCakes, removeOneItem, totalPriceCart } = useCart(cart?.cakes);

  //===================================//
  //                                   //
  //                                   //
  //                                   //
  // precisa fazer um placeholder pras //
  //   imagens de cada item do cart    //
  //                                   //
  //                                   //
  //                                   //
  //===================================//

  return (
    <div className={styles.divCart}>
      <CgShoppingCart
        style={{ color: "var(--color-text-title)", fontSize: "1rem" }}
        onClick={handleOpenAndCloseModal}
      />

      {cart && allCakes.length > 0 && (
        <span className={styles.qntItemsCart}>{allCakes.length}</span>
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

            {cart && allCakes.length === 0 && (
              <p className={`text ${styles.textWarning}`}>
                Seu carrinho está vazio!
              </p>
            )}

            {cart && cart._id && allCakes.length > 0 && (
              <>
                {allCakes.map((cake) => (
                  <ItemCart
                    cartId={cart._id!}
                    cake={cake}
                    removeOneItemFn={removeOneItem}
                    key={cake._id}
                  />
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
                disabled={allCakes.length === 0}
              >
                Limpar tudo
              </button>
              <button
                className={styles.completePurchaseBtn}
                disabled={allCakes.length === 0}
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
