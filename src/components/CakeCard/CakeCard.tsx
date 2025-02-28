"use client";
import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";
import { Fragment, MouseEvent, useMemo, useRef, useState } from "react";
import { CustomizablesParts } from "@/@types/Cake";
import { capitalize } from "@/utils/formatStrings";

const translateCustomizableParts: {
  [key in CustomizablesParts]: string;
} = {
  type: "o tipo da massa",
  fillings: "o recheio",
  frosting: "as coberturas",
  size: "o tamanho"
};

const generatePhrase = (
  customizableParts: CustomizablesParts[]
): string | undefined => {
  const translatedParts = customizableParts.map(
    (part) => translateCustomizableParts[part]
  );

  if (translatedParts.length === 0) {
    return;
  }

  if (translatedParts.length === 1) {
    return capitalize(`${translatedParts[0]} deste bolo é personalizável.`);
  }

  const joinedParts =
    translatedParts.slice(0, -1).join(", ") + " e " + translatedParts.slice(-1);

  return capitalize(`${joinedParts} deste bolo são personalizáveis.`);
};

type Props = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  categories: string[];
  customizableParts: CustomizablesParts[];
};

function CakeCard({
  id,
  name,
  imageUrl,
  price,
  categories,
  customizableParts
}: Props) {
  const infoCardRef = useRef<HTMLDivElement | null>(null);
  const [infosOpen, setInfosOpen] = useState(false);

  const customizablePartsPhrase = useMemo(() => {
    return generatePhrase(customizableParts);
  }, []);

  const handleFocus = () => setInfosOpen(true);

  const handleBlur = () => {
    setTimeout(() => setInfosOpen(false), 200);

    infoCardRef.current?.classList.add(styles.infoClosed);
  };

  const handleClickLink = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <button className={styles.card} onFocus={handleFocus} onBlur={handleBlur}>
      <div className={styles.divImg}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={styles.divText}>
        <div className={styles.divTypeCake}>
          <p className="textBig">{name}</p>
        </div>
        <h4 className={styles.price}>{price}</h4>
      </div>

      {infosOpen && (
        <div className={`${styles.info}`} ref={infoCardRef}>
          <p className={`${styles.categories} text`}>
            {categories.map((category) => (
              <Fragment key={category}>#{category + " "}</Fragment>
            ))}
          </p>

          <h4>{name}</h4>
          {!!customizablePartsPhrase && (
            <p className={`${styles.customizableParts} text`}>
              {customizablePartsPhrase}
            </p>
          )}

          <Link
            href={`/cake/${id}`}
            className={styles.btnCart}
            onMouseDown={handleClickLink}
          >
            <CgShoppingCart style={{ color: "var(--primary-color)" }} />
          </Link>
        </div>
      )}
    </button>
  );
}

export default CakeCard;
