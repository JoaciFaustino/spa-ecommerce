"use client";
import { PersonalizedCake } from "@/@types/Cart";
import { useState } from "react";
import styles from "./ItemCart.module.scss";
import Image from "next/image";
import { formatPriceNumber } from "@/utils/formatPrice";
import { IoIosArrowDown } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { useItemCart } from "./useItemCart";
import SpinnerLoader from "@/components/SpinnerLoader/SpinnerLoader";

function ItemCart({
  cartId,
  removeOneItemFn,
  cake: {
    _id: itemCartId,
    imageUrl,
    name,
    quantity,
    totalPricing,
    fillings,
    size,
    type,
    frosting
  }
}: {
  cartId: string;
  cake: PersonalizedCake;
  removeOneItemFn: (itemCartId: string) => Promise<void>;
}) {
  const { isPending, handleRemoveItem } = useItemCart(
    itemCartId,
    removeOneItemFn
  );
  const [moreDetailsActived, setMoreDetailsActived] = useState(false);
  const unitPrice: string = formatPriceNumber(totalPricing / (quantity || 1));
  const totalPrice: string = formatPriceNumber(totalPricing);
  const fillingsFormated: string =
    fillings.length > 1
      ? fillings.slice(0, -1).join(", ") + " e " + fillings[fillings.length - 1]
      : fillings[0];

  return (
    <div
      className={
        isPending
          ? `${styles.itemCart} ${styles.disabledItem}`
          : `${styles.itemCart}`
      }
    >
      <Image
        src={imageUrl}
        width={80}
        height={80}
        alt={`${name} cart image`}
        style={{ borderRadius: "5px" }}
      />
      <div className={styles.textContent}>
        <h6>{name}</h6>
        <p className="text">
          Quantidade: <span>{quantity}</span>
        </p>
        <p className="text">
          Preço unitário: <span>{unitPrice}</span>
        </p>
        <p className="text">
          Preço total: <span className={styles.priceText}>{totalPrice}</span>
        </p>

        {moreDetailsActived && (
          <>
            <p className="text">
              Tipo de massa: <span>{type}</span>
            </p>

            {frosting && (
              <p className="text">
                Cobertura: <span>{frosting}</span>
              </p>
            )}

            {fillings && fillings.length > 0 && (
              <p className="text">
                Recheios: <span>{fillingsFormated}</span>
              </p>
            )}

            <p className="text">
              Tamanho: <span>{size}</span>
            </p>
          </>
        )}

        <p
          className={`${styles.moreDetails} text`}
          onClick={() => setMoreDetailsActived((prev) => !prev)}
        >
          <IoIosArrowDown
            className={moreDetailsActived ? styles.rotated : ""}
            style={{ color: "var(--color-text-paragraph)", fontSize: "1rem" }}
          />
          {moreDetailsActived ? "menos detalhes..." : "mais detalhes..."}
        </p>
      </div>

      <div className={styles.divIconDelete}>
        {isPending && <SpinnerLoader color="var(--primary-color)" size={1} unitSize="rem" />}

        {!isPending && (
          <BsTrash
            style={{ color: "red", fontSize: "1.5rem" }}
            onClick={handleRemoveItem}
          />
        )}
      </div>
    </div>
  );
}

export default ItemCart;
