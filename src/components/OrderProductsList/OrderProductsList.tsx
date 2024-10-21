"use client";
import { PersonalizedCake } from "@/@types/Cart";
import styles from "./OrderProductsList.module.scss";
import { formatPriceNumber } from "@/utils/formatPrice";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ItemCart from "../Cart/ItemCart/ItemCart";

type Props = {
  cakes: PersonalizedCake[];
  startOpened?: boolean;
};

function OrderProductsList({ cakes, startOpened = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { cakeQuantity, totalPrice } = useMemo(() => {
    return cakes.reduce(
      ({ cakeQuantity, totalPrice }, cake) => {
        const newCakeQuantity = cakeQuantity + cake.quantity;
        const newTotalPrice = totalPrice + (cake.totalPricing || 0);

        return { cakeQuantity: newCakeQuantity, totalPrice: newTotalPrice };
      },
      { cakeQuantity: 0, totalPrice: 0 }
    );
  }, [cakes]);

  const toggleProducts = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (startOpened) {
      setIsOpen(true);
    }
  }, []);

  return (
    <section className={styles.mainSection}>
      <div className={`${styles.info}`}>
        {cakeQuantity > 0 && (
          <p className={`text`}>
            {cakeQuantity} produto{cakeQuantity > 1 ? "s" : ""}
          </p>
        )}

        <h3>
          Total:{" "}
          <span className={styles.priceText}>
            {totalPrice >= 1 && formatPriceNumber(totalPrice)}
            {totalPrice < 1 && "R$ --,--"}
          </span>
        </h3>
      </div>

      <h3 className={styles.title} onClick={toggleProducts}>
        Produtos
        <IoIosArrowDown
          className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
          style={{ color: "#fff", fontSize: "1.5rem" }}
        />
      </h3>

      {isOpen && (
        <div
          className={styles.products}
          style={cakes.length === 1 ? { gridTemplateColumns: "1fr" } : {}}
        >
          {cakes.map((cake) => (
            <div className={styles.product} key={cake._id}>
              <ItemCart cake={cake} componentType="order" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderProductsList;
