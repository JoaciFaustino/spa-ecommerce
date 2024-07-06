import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";

type Props = {
  nameCake: string;
  typeCake: string;
  imageCake: string;
  priceCake: string;
};

function CakeCard({ nameCake, typeCake, imageCake, priceCake }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.divImg}>
        <Image
          src={imageCake}
          alt={nameCake}
          sizes="100vw"
          width={1}
          height={1}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain"
          }}
          color="var(--primary-color)"
        />
      </div>
      <div className={styles.divText}>
        <div className={styles.divTypeCake}>
          <p className="textBig">{nameCake}</p>
        </div>
        <h4 className={styles.price}>{priceCake}</h4>
      </div>
      <div className={styles.hoverInfo}>
        <h4>{nameCake}</h4>
        <p className="textBig">{nameCake}</p>
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
