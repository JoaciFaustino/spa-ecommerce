"use client";
import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  cakeId: string;
  nameCake: string;
  typeCake: string;
  imageCake: string;
  priceCake: string;
};

function CakeCard({ cakeId, nameCake, typeCake, imageCake, priceCake }: Props) {
  const infoCardRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutsideCakeCard);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideCakeCard);
  //   };
  // }, []);

  // const handleClickOutsideCakeCard: EventListener = (event) => {
  //   const { current } = infoCardRef;

  //   if (current && !current.contains(event.target as Node)) {
  //     current?.classList.remove(styles.infoOpen);
  //   }
  // };

  // const handleClick = () => {
  //   infoCardRef.current?.classList.toggle(styles.infoOpen);
  // };

  const handleFocus = () => {
    infoCardRef.current?.classList.add(styles.infoOpen);
  };

  const handleBlur = () => {
    infoCardRef.current?.classList.remove(styles.infoOpen);
  };

  return (
    <button className={styles.card} onFocus={handleFocus} onBlur={handleBlur}>
      <div className={styles.divImg}>
        <Image
          src={imageCake}
          alt={nameCake}
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={styles.divText}>
        <div className={styles.divTypeCake}>
          <p className="textBig">{nameCake}</p>
        </div>
        <h4 className={styles.price}>{priceCake}</h4>
      </div>

      <div className={styles.info} ref={infoCardRef}>
        <h4>{nameCake}</h4>
        <p className="textBig">{nameCake}</p>
        <Link href={`/cake/${cakeId}`}>
          <div className={styles.btnCart}>
            <CgShoppingCart
              style={{
                color: "var(--primary-color)",
                fontSize: "1.5rem"
              }}
            />
          </div>
        </Link>
      </div>
    </button>
  );
}

export default CakeCard;
