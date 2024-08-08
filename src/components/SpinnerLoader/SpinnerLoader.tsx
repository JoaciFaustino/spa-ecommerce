import { CSSProperties } from "react";
import styles from "./SpinnerLoader.module.scss";

type Props = {
  color: string;
  size: number;
  unitSize: "rem" | "px";
};

function SpinnerLoader({ color, size, unitSize }: Props) {
  const style: CSSProperties = {
    height: size + unitSize,
    width: size + unitSize,
    border: `solid ${size * (10 / 100)}${unitSize} ${color}`
  };

  return (
    <span className={styles.spinner} style={style}>
      <span className={styles.internCircle} style={style}></span>
    </span>
  );
}

export default SpinnerLoader;
