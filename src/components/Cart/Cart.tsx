"use client";
import { CgShoppingCart } from "react-icons/cg";
import styles from "./Cart.module.scss";
import { useEffect, useRef, useState } from "react";
import { Cart as CartType } from "@/@types/Cart";
import { useModal } from "@/hooks/useModal";
import { formatPriceNumber } from "@/utils/formatPrice";
import ItemCart from "./ItemCart/ItemCart";
import { removeItemCart } from "@/services/requests";
import PopUpError from "../PopUpError/PopUpError";

const ANIMATION_TIME_ERROR_POPUP = 1000 * 15;

function Cart({ cart }: { cart: CartType | undefined }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [allCakes, setAllCakes] = useState(cart?.cakes || []);
  const { handleOpenAndCloseModal, modalIsOpen } = useModal(modalRef);
  const [popUpIsActived, setPopUpIsActived] = useState(false);
  const totalPriceCart: string = formatPriceNumber(
    allCakes.reduce((acm, { totalPricing }) => acm + totalPricing, 0)
  );

  useEffect(() => {
    setTimeout(() => setPopUpIsActived(false), ANIMATION_TIME_ERROR_POPUP);
  }, [popUpIsActived]);

  const removeOneItem = async (cartId: string, itemCartId: string) => {
    try {
      await removeItemCart(cartId, itemCartId);

      setAllCakes((prev) => prev.filter((cake) => cake._id !== itemCartId));
    } catch (error: any) {
      setPopUpIsActived(true);
    }
  };

  return (
    <div className={styles.divCart}>
      {!!popUpIsActived && (
        <PopUpError
          message={"Ocorreu um erro ao tentar remover o item do carrinho!"}
        />
      )}

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
