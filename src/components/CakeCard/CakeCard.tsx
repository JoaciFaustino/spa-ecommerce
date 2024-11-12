"use client";
import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

type Props = {
  cakeId: string;
  nameCake: string;
  typeCake: string;
  imageCake: string;
  priceCake: string;
};

function CakeCard({ cakeId, nameCake, imageCake, priceCake }: Props) {
  const infoCardRef = useRef<HTMLDivElement | null>(null);
  const [infosOpen, setInfosOpen] = useState(false);
  const [redirectIsLoading, setRedirectIsLoading] = useState(false);

  const handleFocus = () => {
    setInfosOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setInfosOpen(false), 200);

    infoCardRef.current?.classList.add(styles.infoClosed);
  };

  const handleClickLink = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    setRedirectIsLoading(true);
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

      {infosOpen && (
        <div className={`${styles.info}`} ref={infoCardRef}>
          <h4>{nameCake}</h4>

          <Link href={`/cake/${cakeId}`} onMouseDown={handleClickLink}>
            <div className={styles.btnCart}>
              {!redirectIsLoading && (
                <CgShoppingCart
                  style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
                />
              )}

              {redirectIsLoading && (
                <SpinnerLoader
                  unitSize="rem"
                  size={1.5}
                  color="var(--primary-color)"
                />
              )}
            </div>
          </Link>
        </div>
      )}
    </button>
  );
}

export default CakeCard;
