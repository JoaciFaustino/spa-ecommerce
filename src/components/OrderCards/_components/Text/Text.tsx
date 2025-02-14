import styles from "../../OrderCard.module.scss";

type Props = {
  label: string;
  value: string;
  color?: string;
  loading?: boolean;
};

const Text = ({ label, value, color, loading = false }: Props) => (
  <p className={`text ${styles.text} ${loading ? styles.loading : ""}`}>
    {label}: <span style={{ color }}>{value}</span>
  </p>
);

export default Text;
