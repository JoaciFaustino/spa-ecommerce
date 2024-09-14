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

type ItemCartProps = {
  cake: PersonalizedCake;
  componentType: "cart" | "orderPage";
};

function ItemCart({
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
  },
  componentType
}: ItemCartProps) {
  const { isPending, handleRemoveItem } = useItemCart(itemCartId);
  const [moreDetailsActived, setMoreDetailsActived] = useState(false);
  const unitPrice: string = formatPriceNumber(
    (totalPricing || 0) / (quantity || 1)
  );
  const totalPrice: string = formatPriceNumber(totalPricing || 0);
  const fillingsFormated: string =
    fillings.length > 1
      ? fillings.slice(0, -1).join(", ") + " e " + fillings[fillings.length - 1]
      : fillings[0];

  return (
    <div
      className={`${styles.itemCart} ${isPending ? styles.disabledItem : ""} ${
        componentType === "orderPage" ? styles.orderStyle : styles.cartStyle
      }`}
    >
      <Image
        src={imageUrl}
        width={80}
        height={80}
        alt={`${name} cart image`}
        style={{
          borderRadius: "5px",
          objectFit: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.2)"
        }}
      />
      <div className={styles.textContent}>
        <h6>{name}</h6>
        <Text title="Quantidade" value={quantity} />
        <Text title="Preço unitário" value={unitPrice} />
        <Text title="Preço total" value={totalPrice} isPrice />

        {moreDetailsActived && (
          <>
            <Text title="Tipo de massa" value={type} />
            <Text title="Cobertura" value={frosting} isShow={!!frosting} />
            <Text
              title="Recheios"
              value={fillingsFormated}
              isShow={fillings && fillings.length > 0}
            />
            <Text title="Tamanho" value={size} />
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

      {componentType === "cart" && (
        <div className={styles.divIconDelete}>
          {isPending && (
            <SpinnerLoader
              color="var(--primary-color)"
              size={1}
              unitSize="rem"
            />
          )}

          {!isPending && (
            <BsTrash
              style={{ color: "red", fontSize: "1.5rem" }}
              onClick={handleRemoveItem}
            />
          )}
        </div>
      )}
    </div>
  );
}

type TextProps = {
  title: string;
  value?: string | number;
  isPrice?: boolean;
  isShow?: boolean;
};

function Text({ title, value, isPrice = false, isShow = true }: TextProps) {
  return isShow && value ? (
    <p className="text">
      {title}: <span className={isPrice ? styles.priceText : ""}>{value}</span>
    </p>
  ) : (
    <></>
  );
}

export default ItemCart;
