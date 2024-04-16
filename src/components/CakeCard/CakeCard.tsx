import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";

type Props = {
  typeCake: string;
  imageCake: string;
  priceCake: string;
};

function CakeCard({ typeCake, imageCake, priceCake }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.divImg}>
        <Image
          src={imageCake}
          alt={typeCake}
          sizes="100vw"
          width={1}
          height={1}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain"
          }}
        />
      </div>
      <div className={styles.divText}>
        <p className="textBig">{typeCake}</p>
        <h4 className={styles.price}>{priceCake}</h4>
      </div>
      <div className={styles.hoverInfo}>
        <h4>{typeCake}</h4>
        <button className={styles.btnCart}>
          <CgShoppingCart
            style={{
              color: "var(--primary-color)",
              fontSize: "1.5rem"
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default CakeCard;
