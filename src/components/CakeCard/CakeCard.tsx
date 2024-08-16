import Image from "next/image";
import styles from "./CakeCard.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import Link from "next/link";

type Props = {
  cakeId: string;
  nameCake: string;
  typeCake: string;
  imageCake: string;
  priceCake: string;
};

function CakeCard({ cakeId, nameCake, typeCake, imageCake, priceCake }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.divImg}>
        <Image
          src={imageCake}
          alt={nameCake}
          fill
          style={{ objectFit: "contain" }}
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
        <Link href={`/cake/${cakeId}`}>
          <button className={styles.btnCart}>
            <CgShoppingCart
              style={{
                color: "var(--primary-color)",
                fontSize: "1.5rem"
              }}
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CakeCard;
