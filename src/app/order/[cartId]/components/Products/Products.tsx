"use client";
import { PersonalizedCake } from "@/@types/Cart";
import styles from "./Products.module.scss";
import ItemCart from "@/components/Cart/ItemCart/ItemCart";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { formatPriceNumber } from "@/utils/formatPrice";
import { CartContext } from "@/contexts/CartProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Products() {
  const { cakes = [] } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const cakeQuantity =
    cakes.reduce((acm, { quantity }) => acm + quantity, 0) || 0;
  const totalPriceCart = cakes.reduce(
    (acm, { totalPricing }) => acm + (totalPricing || 0),
    0
  );
  const [isMounted, setIsMounted] = useState(false);
  const toggleProducts = () => setIsOpen((prev) => !prev);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setIsOpen(true);

    if (!isMounted) {
      return;
    }

    if (cakes.length === 0) {
      router.push("/menu?sortBy=popularidade");

      toast.error("Você não pode finalizar um pedido com o carrinho vázio!");
    }
  }, [cakes]);

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
            {totalPriceCart >= 1 && formatPriceNumber(totalPriceCart)}
            {totalPriceCart < 1 && "R$ --,--"}
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
              <ItemCart cake={cake} componentType="orderPage" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
